const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "bidum.db");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

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

  CREATE INDEX IF NOT EXISTS idx_schools_municipality_id ON schools(municipality_id);
  CREATE INDEX IF NOT EXISTS idx_pledges_school ON pledges(school);
`);

function extractConstLiteral(fileContent, constName) {
  const re = new RegExp(`const\\s+${constName}\\s*=\\s*([\\s\\S]*?);\\n`, "m");
  const match = fileContent.match(re);
  if (!match) return null;
  return match[1];
}

function seedSchoolsFromFrontend() {
  const existing = db.prepare("SELECT COUNT(*) as count FROM schools").get();
  if (existing.count > 0) return;

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

  const tx = db.transaction(() => {
    for (const [municipality, schools] of Object.entries(skolar)) {
      insertMunicipality.run(municipality);
      const row = getMunicipalityId.get(municipality);
      if (!row) continue;

      for (const school of schools) {
        insertSchool.run(school, row.id);
      }
    }
  });

  tx();
}

seedSchoolsFromFrontend();

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
      `SELECT name, email, sveitarfelag, school, grade, child_name as childName, timestamp
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

const staticRoot = path.resolve(__dirname, "..");
app.use(express.static(staticRoot));

app.listen(PORT, () => {
  console.log(`Bíðum backend running on http://localhost:${PORT}`);
});
