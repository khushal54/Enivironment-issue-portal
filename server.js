const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

/* ===== MIDDLEWARE ===== */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC FILES ===== */
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

/* ===== SQLITE DATABASE ===== */
const db = new sqlite3.Database("./eco.db", (err) => {
  if (err) console.log(err);
  else console.log("SQLite Connected");
});

/* ===== CREATE TABLE IF NOT EXISTS ===== */
db.run(`
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  severity TEXT,
  loc TEXT,
  desc TEXT,
  img TEXT,
  time TEXT
)
`);

/* ===== SAVE REPORT ===== */
app.post("/api/reports", (req, res) => {
  const { type, severity, loc, desc, img, time } = req.body;

  db.run(
    "INSERT INTO reports(type,severity,loc,desc,img,time) VALUES(?,?,?,?,?,?)",
    [type, severity, loc, desc, img, time],
    (err) => {
      if (err) return res.json({ error: err });
      res.json({ status: "ok" });
    }
  );
});

/* ===== GET REPORTS ===== */
app.get("/api/reports", (req, res) => {
  db.all("SELECT * FROM reports ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.json({ error: err });
    res.json(rows);
  });
});

/* ===== PAGE ROUTES ===== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/report", (req, res) => {
  res.sendFile(path.join(__dirname, "views/report.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views/admin-dashboard.html"));
});

/* ===== LOGIN LOGIC ===== */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "khushal54" && password === "Khushal@143") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/report");
  }
});

/* ===== START SERVER ===== */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

