const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS municipalities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        municipality_id INTEGER NOT NULL REFERENCES municipalities(id),
        UNIQUE(name, municipality_id)
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS pledges (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        sveitarfelag TEXT NOT NULL,
        school TEXT NOT NULL,
        grade INTEGER NOT NULL,
        child_name TEXT,
        timestamp TIMESTAMPTZ NOT NULL,
        UNIQUE(email, school, grade)
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS otp_verifications (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        otp_code TEXT NOT NULL,
        pledge_data TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_schools_municipality_id ON schools(municipality_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_pledges_school ON pledges(school)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verifications(email)`);
  } finally {
    client.release();
  }
}

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

function getSkolarFromFrontend() {
  const scriptPath = path.resolve(__dirname, "..", "script.js");
  if (!fs.existsSync(scriptPath)) return null;

  const scriptContent = fs.readFileSync(scriptPath, "utf8");
  const skolarLiteral = extractConstLiteral(scriptContent, "skolar");
  if (!skolarLiteral) return null;

  return vm.runInNewContext(`(${skolarLiteral})`);
}

async function seedSchoolsFromCsvOrFrontend() {
  const { rows } = await pool.query("SELECT COUNT(*) as count FROM municipalities");
  if (parseInt(rows[0].count, 10) > 0) return;

  const csvPath = path.resolve(__dirname, "..", "skolar.csv");
  const csvRows = loadSchoolsFromCsv(csvPath);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    if (csvRows) {
      for (const row of csvRows) {
        await client.query(
          "INSERT INTO municipalities(name) VALUES($1) ON CONFLICT DO NOTHING",
          [row.municipality]
        );
        const mRes = await client.query(
          "SELECT id FROM municipalities WHERE name = $1",
          [row.municipality]
        );
        if (!mRes.rows[0]) continue;
        await client.query(
          "INSERT INTO schools(name, municipality_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
          [row.school, mRes.rows[0].id]
        );
      }
    } else {
      const skolar = getSkolarFromFrontend();
      if (skolar) {
        for (const [municipality, schools] of Object.entries(skolar)) {
          await client.query(
            "INSERT INTO municipalities(name) VALUES($1) ON CONFLICT DO NOTHING",
            [municipality]
          );
          const mRes = await client.query(
            "SELECT id FROM municipalities WHERE name = $1",
            [municipality]
          );
          if (!mRes.rows[0]) continue;
          for (const school of schools) {
            await client.query(
              "INSERT INTO schools(name, municipality_id) VALUES($1, $2) ON CONFLICT DO NOTHING",
              [String(school).trim(), mRes.rows[0].id]
            );
          }
        }
      }
    }

    await client.query("COMMIT");
    console.log("Skólar hlaðnir inn í gagnagrunn");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

app.use(cors());
app.use(express.json());

// Keyrir initDb og seeding við fyrstu beiðni (Vercel serverless)
let initPromise = null;
app.use((req, res, next) => {
  if (!initPromise) {
    initPromise = initDb().then(() => seedSchoolsFromCsvOrFrontend());
  }
  initPromise.then(next).catch(next);
});

app.get("/api/health", async (_req, res) => {
  const schoolRes = await pool.query("SELECT COUNT(*) as count FROM schools");
  const pledgeRes = await pool.query("SELECT COUNT(*) as count FROM pledges");
  res.json({
    ok: true,
    schoolCount: parseInt(schoolRes.rows[0].count, 10),
    pledgeCount: parseInt(pledgeRes.rows[0].count, 10)
  });
});

app.get("/api/municipalities", async (_req, res) => {
  const { rows } = await pool.query("SELECT name FROM municipalities ORDER BY name");
  res.json(rows.map((r) => r.name));
});

app.get("/api/schools", async (req, res) => {
  const municipality = (req.query.municipality || "").toString().trim();

  if (municipality) {
    const { rows } = await pool.query(
      `SELECT s.name
       FROM schools s
       JOIN municipalities m ON m.id = s.municipality_id
       WHERE m.name = $1
       ORDER BY s.name`,
      [municipality]
    );
    res.json(rows.map((r) => r.name));
    return;
  }

  const { rows } = await pool.query(
    `SELECT s.name, m.name as municipality
     FROM schools s
     JOIN municipalities m ON m.id = s.municipality_id
     ORDER BY m.name, s.name`
  );
  res.json(rows);
});

app.get("/api/schools/tree", async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT s.name, m.name as municipality
     FROM schools s
     JOIN municipalities m ON m.id = s.municipality_id
     ORDER BY m.name, s.name`
  );

  const tree = {};
  rows.forEach((row) => {
    if (!tree[row.municipality]) tree[row.municipality] = [];
    tree[row.municipality].push(row.name);
  });

  res.json(tree);
});

app.get("/api/pledges", async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT sveitarfelag, school, grade, timestamp
     FROM pledges
     ORDER BY timestamp DESC`
  );
  res.json(rows);
});

app.get("/api/pledges/stats", async (_req, res) => {
  const totalRes = await pool.query("SELECT COUNT(*) as count FROM pledges");
  const schoolRes = await pool.query("SELECT COUNT(DISTINCT school) as count FROM pledges");
  res.json({
    totalPledges: parseInt(totalRes.rows[0].count, 10),
    totalSchools: parseInt(schoolRes.rows[0].count, 10)
  });
});

app.post("/api/pledges", async (req, res) => {
  const { name, email, sveitarfelag, school, grade, childName, timestamp } = req.body || {};

  if (!name || !email || !sveitarfelag || !school || !grade) {
    res.status(400).json({ error: "Vantar skyldureiti" });
    return;
  }

  try {
    await pool.query(
      `INSERT INTO pledges(name, email, sveitarfelag, school, grade, child_name, timestamp)
       VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        String(name).trim(),
        String(email).trim().toLowerCase(),
        String(sveitarfelag).trim(),
        String(school).trim(),
        parseInt(grade, 10),
        childName ? String(childName).trim() : null,
        timestamp || new Date().toISOString()
      ]
    );
    res.status(201).json({ ok: true });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ error: "Undirskrift er þegar til fyrir þennan bekk" });
      return;
    }
    res.status(500).json({ error: "Ekki tókst að vista undirskrift" });
  }
});

app.post("/api/otp/request", async (req, res) => {
  const { name, email, sveitarfelag, school, grade, childName } = req.body || {};

  if (!name || !email || !sveitarfelag || !school || !grade) {
    res.status(400).json({ error: "Vantar skyldureiti" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const parts = normalizedEmail.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    res.status(400).json({ error: "Ógilt netfang" });
    return;
  }

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

  await pool.query(
    "DELETE FROM otp_verifications WHERE email = $1 AND used = FALSE",
    [normalizedEmail]
  );
  await pool.query(
    `INSERT INTO otp_verifications(email, otp_code, pledge_data, created_at, expires_at, used)
     VALUES($1, $2, $3, $4, $5, FALSE)`,
    [normalizedEmail, otp, pledgeData, now.toISOString(), expires.toISOString()]
  );

  // Placeholder: prenta OTP í terminal
  console.log(`[OTP] Staðfestingarkóði fyrir ${normalizedEmail}: ${otp}`);

  const [user, domain] = parts;
  const maskedEmail = `${user[0]}***@${domain}`;

  res.json({ ok: true, maskedEmail });
});

app.post("/api/otp/verify", async (req, res) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    res.status(400).json({ error: "Vantar netfang eða staðfestingarkóða" });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const now = new Date().toISOString();

  const { rows } = await pool.query(
    `SELECT * FROM otp_verifications
     WHERE email = $1 AND otp_code = $2 AND used = FALSE AND expires_at > $3
     ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail, String(otp).trim(), now]
  );

  if (!rows[0]) {
    res.status(400).json({ error: "Rangt eða útrunnið staðfestingarkóði" });
    return;
  }

  await pool.query(
    "UPDATE otp_verifications SET used = TRUE WHERE id = $1",
    [rows[0].id]
  );

  const pledgeData = JSON.parse(rows[0].pledge_data);

  try {
    await pool.query(
      `INSERT INTO pledges(name, email, sveitarfelag, school, grade, child_name, timestamp)
       VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        pledgeData.name,
        pledgeData.email,
        pledgeData.sveitarfelag,
        pledgeData.school,
        pledgeData.grade,
        pledgeData.childName,
        new Date().toISOString()
      ]
    );
    res.status(201).json({ ok: true });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ error: "Undirskrift er þegar til fyrir þennan bekk" });
      return;
    }
    res.status(500).json({ error: "Ekki tókst að vista undirskrift" });
  }
});

const staticRoot = path.resolve(__dirname, "..");
app.use(express.static(staticRoot));

// Staðbundin þróun
if (require.main === module) {
  initDb()
    .then(() => seedSchoolsFromCsvOrFrontend())
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Bíðum backend running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Villa við ræsingu:", err);
      process.exit(1);
    });
}

module.exports = app;
