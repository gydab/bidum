const express = require("express");
const cors = require("cors");
const { DatabaseSync } = require("node:sqlite");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "bidum.db");
fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS municipalities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    municipality_id INTEGER NOT NULL,
    UNIQUE(name, municipality_id),
    FOREIGN KEY(municipality_id) REFERENCES municipalities(id)
  );

  CREATE TABLE IF NOT EXISTS pledges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    sveitarfelag TEXT NOT NULL,
    school TEXT NOT NULL,
    grade INTEGER NOT NULL,
    child_name TEXT,
    timestamp TEXT NOT NULL,
    UNIQUE(email, school, grade)
  );

  CREATE TABLE IF NOT EXISTS otp_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    pledge_data TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_schools_municipality_id ON schools(municipality_id);
  CREATE INDEX IF NOT EXISTS idx_pledges_school ON pledges(school);
  CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verifications(email);
`);

function extractConstLiteral(fileContent, constName) {
  const re = new RegExp(`const\\s+${constName}\\s*=\\s*([\\s\\S]*?);\\n`, "m");
  const match = fileContent.match(re);
  if (!match) return null;
  return match[1];
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function loadSchoolsFromCsv(csvPath) {
  if (!fs.existsSync(csvPath)) return null;

  const csvContent = fs.readFileSync(csvPath, "utf8");
  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (!lines.length) return null;

  const header = parseCsvLine(lines[0]);
  const schoolNameIndex = header.findIndex((col) =>
    col.toLowerCase().startsWith("nafn skóla")
  );
  const municipalityIndex = header.findIndex((col) =>
    col.toLowerCase().startsWith("sveitarfélag")
  );

  if (schoolNameIndex < 0 || municipalityIndex < 0) return null;

  const rows = [];
  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    const school = (cols[schoolNameIndex] || "").trim();
    const municipality = (cols[municipalityIndex] || "").trim();

    if (!school || !municipality) continue;
    if (school.includes("@")) continue;

    rows.push({ school, municipality });
  }

  return rows.length ? rows : null;
}

function seedSchoolsFromFrontend() {
  const scriptPath = path.resolve(__dirname, "..", "script.js");
  if (!fs.existsSync(scriptPath)) return;

  const scriptContent = fs.readFileSync(scriptPath, "utf8");
  const skolarLiteral = extractConstLiteral(scriptContent, "skolar");
  if (!skolarLiteral) return;

  const skolar = vm.runInNewContext(`(${skolarLiteral})`);

  const insertMunicipality = db.prepare(
    "INSERT OR IGNORE INTO municipalities(name) VALUES(?)"
  );
  const getMunicipalityId = db.prepare(
    "SELECT id FROM municipalities WHERE name = ?"
  );
  const insertSchool = db.prepare(
    "INSERT OR IGNORE INTO schools(name, municipality_id) VALUES(?, ?)"
  );

  for (const [municipality, schools] of Object.entries(skolar)) {
    insertMunicipality.run(municipality);
    const row = getMunicipalityId.get(municipality);
    if (!row) continue;

    for (const school of schools) {
      insertSchool.run(String(school).trim(), row.id);
    }
  }
}

function seedSchoolsFromCsvOrFrontend() {
  const csvPath = path.resolve(__dirname, "..", "skolar.csv");
  const csvRows = loadSchoolsFromCsv(csvPath);

  const insertMunicipality = db.prepare(
    "INSERT OR IGNORE INTO municipalities(name) VALUES(?)"
  );
  const getMunicipalityId = db.prepare(
    "SELECT id FROM municipalities WHERE name = ?"
  );
  const insertSchool = db.prepare(
    "INSERT OR IGNORE INTO schools(name, municipality_id) VALUES(?, ?)"
  );

  db.exec("BEGIN");
  try {
    db.prepare("DELETE FROM schools").run();
    db.prepare("DELETE FROM municipalities").run();

    if (csvRows) {
      for (const row of csvRows) {
        insertMunicipality.run(row.municipality);
        const municipalityRow = getMunicipalityId.get(row.municipality);
        if (!municipalityRow) continue;
        insertSchool.run(row.school, municipalityRow.id);
      }
    } else {
      seedSchoolsFromFrontend();
    }

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

seedSchoolsFromCsvOrFrontend();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  const schoolCount = db.prepare("SELECT COUNT(*) as count FROM schools").get().count;
  const pledgeCount = db.prepare("SELECT COUNT(*) as count FROM pledges").get().count;

  res.json({ ok: true, schoolCount, pledgeCount });
});

app.get("/api/municipalities", (_req, res) => {
  const rows = db
    .prepare("SELECT name FROM municipalities ORDER BY name COLLATE NOCASE")
    .all();
  res.json(rows.map((r) => r.name));
});

app.get("/api/schools", (req, res) => {
  const municipality = (req.query.municipality || "").toString().trim();

  if (municipality) {
    const rows = db
      .prepare(
        `SELECT s.name
         FROM schools s
         JOIN municipalities m ON m.id = s.municipality_id
         WHERE m.name = ?
         ORDER BY s.name COLLATE NOCASE`
      )
      .all(municipality);

    res.json(rows.map((r) => r.name));
    return;
  }

  const rows = db
    .prepare(
      `SELECT s.name, m.name as municipality
       FROM schools s
       JOIN municipalities m ON m.id = s.municipality_id
       ORDER BY m.name COLLATE NOCASE, s.name COLLATE NOCASE`
    )
    .all();

  res.json(rows);
});

app.get("/api/schools/tree", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT s.name, m.name as municipality
       FROM schools s
       JOIN municipalities m ON m.id = s.municipality_id
       ORDER BY m.name COLLATE NOCASE, s.name COLLATE NOCASE`
    )
    .all();

  const tree = {};
  rows.forEach((row) => {
    if (!tree[row.municipality]) tree[row.municipality] = [];
    tree[row.municipality].push(row.name);
  });

  res.json(tree);
});

app.get("/api/pledges", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT sveitarfelag, school, grade, timestamp
       FROM pledges
       ORDER BY timestamp DESC`
    )
    .all();

  res.json(rows);
});

app.get("/api/pledges/stats", (_req, res) => {
  const totalPledges = db.prepare("SELECT COUNT(*) as count FROM pledges").get().count;
  const totalSchools = db
    .prepare("SELECT COUNT(DISTINCT school) as count FROM pledges")
    .get().count;

  res.json({ totalPledges, totalSchools });
});

app.post("/api/pledges", (req, res) => {
  const { name, email, sveitarfelag, school, grade, childName, timestamp } = req.body || {};

  if (!name || !email || !sveitarfelag || !school || !grade) {
    res.status(400).json({ error: "Vantar skyldureiti" });
    return;
  }

  try {
    db.prepare(
      `INSERT INTO pledges(name, email, sveitarfelag, school, grade, child_name, timestamp)
       VALUES(?, ?, ?, ?, ?, ?, ?)`
    ).run(
      String(name).trim(),
      String(email).trim().toLowerCase(),
      String(sveitarfelag).trim(),
      String(school).trim(),
      parseInt(grade, 10),
      childName ? String(childName).trim() : null,
      timestamp || new Date().toISOString()
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    if (String(error.message).includes("UNIQUE constraint failed")) {
      res.status(409).json({ error: "Undirskrift er þegar til fyrir þennan bekk" });
      return;
    }

    res.status(500).json({ error: "Ekki tókst að vista undirskrift" });
  }
});

app.post("/api/otp/request", (req, res) => {
  const { name, email, sveitarfelag, school, grade, childName } = req.body || {};

  if (!name || !email || !sveitarfelag || !school || !grade) {
    res.status(400).json({ error: "Vantar skyldureiti" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const now = new Date();
  const expires = new Date(now.getTime() + 10 * 60 * 1000);

  const pledgeData = JSON.stringify({
    name: String(name).trim(),
    email: normalizedEmail,
    sveitarfelag: String(sveitarfelag).trim(),
    school: String(school).trim(),
    grade: parseInt(grade, 10),
    childName: childName ? String(childName).trim() : null
  });

  db.prepare("DELETE FROM otp_verifications WHERE email = ? AND used = 0").run(normalizedEmail);
  db.prepare(
    "INSERT INTO otp_verifications(email, otp_code, pledge_data, created_at, expires_at, used) VALUES(?, ?, ?, ?, ?, 0)"
  ).run(normalizedEmail, otp, pledgeData, now.toISOString(), expires.toISOString());

  // Placeholder: print OTP to console for development
  console.log(`[OTP] Staðfestingarkóði fyrir ${normalizedEmail}: ${otp}`);

  const [user, domain] = normalizedEmail.split("@");
  const maskedEmail = `${user[0]}***@${domain}`;

  res.json({ ok: true, maskedEmail });
});

app.post("/api/otp/verify", (req, res) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    res.status(400).json({ error: "Vantar netfang eða staðfestingarkóða" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const now = new Date().toISOString();

  const record = db.prepare(
    "SELECT * FROM otp_verifications WHERE email = ? AND otp_code = ? AND used = 0 AND expires_at > ? ORDER BY created_at DESC LIMIT 1"
  ).get(normalizedEmail, String(otp).trim(), now);

  if (!record) {
    res.status(400).json({ error: "Rangt eða útrunnið staðfestingarkóði" });
    return;
  }

  db.prepare("UPDATE otp_verifications SET used = 1 WHERE id = ?").run(record.id);

  const pledgeData = JSON.parse(record.pledge_data);

  try {
    db.prepare(
      `INSERT INTO pledges(name, email, sveitarfelag, school, grade, child_name, timestamp)
       VALUES(?, ?, ?, ?, ?, ?, ?)`
    ).run(
      pledgeData.name,
      pledgeData.email,
      pledgeData.sveitarfelag,
      pledgeData.school,
      pledgeData.grade,
      pledgeData.childName,
      new Date().toISOString()
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    if (String(error.message).includes("UNIQUE constraint failed")) {
      res.status(409).json({ error: "Undirskrift er þegar til fyrir þennan bekk" });
      return;
    }
    res.status(500).json({ error: "Ekki tókst að vista undirskrift" });
  }
});

const staticRoot = path.resolve(__dirname, "..");
app.use(express.static(staticRoot));

app.listen(PORT, () => {
  console.log(`Bíðum backend running on http://localhost:${PORT}`);
});
