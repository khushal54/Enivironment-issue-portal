const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(express.static("public"));

/* DATABASE */
const db = new sqlite3.Database("./eco.db", err => {
  if (!err) console.log("SQLite Connected");
});

db.run(`CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  severity TEXT,
  loc TEXT,
  desc TEXT,
  img TEXT,
  time TEXT
)`);

/* SAVE REPORT */
app.post("/api/reports", (req, res) => {
  const { type, severity, loc, desc, img, time } = req.body;
  db.run(
    "INSERT INTO reports(type,severity,loc,desc,img,time) VALUES(?,?,?,?,?,?)",
    [type, severity, loc, desc, img, time],
    err => res.json(err ? { status: "error" } : { status: "ok" })
  );
});

/* GET REPORTS */
app.get("/api/reports", (req, res) => {
  db.all("SELECT * FROM reports ORDER BY id DESC", [], (err, rows) =>
    res.json(rows)
  );
});

/* GMAIL */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "khushalbhaskarni@gmail.com",
    pass: "ciwgqywdyyxvfmzt"
  }
});

/* OTP MEMORY */
let otpStore = {};

/* SEND OTP */
app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ status: "missing" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  await transporter.sendMail({
    from: "khushalbhaskarni@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`
  });

  res.json({ status: "sent" });
});

/* VERIFY OTP */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    res.json({ status: "verified" });
  } else {
    res.json({ status: "invalid" });
  }
});

/* RESOLVE REPORT */
app.post("/resolve-report", async (req, res) => {
  const { id, proof } = req.body;

  try {
    await transporter.sendMail({
      from: "khushalbhaskarni@gmail.com",
      to: "khushalbhaskarni@gmail.com",
      subject: "Issue Resolved Proof",
      text: "Admin has resolved the issue. Proof attached below.",
      attachments: [
        {
          filename: "proof.png",
          content: proof.split("base64,")[1],
          encoding: "base64"
        }
      ]
    });

    db.run("DELETE FROM reports WHERE id=?", [id], () => {
      res.json({ status: "resolved" });
    });

  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

/* PAGES */
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/login.html"))
);
app.get("/report", (req, res) =>
  res.sendFile(path.join(__dirname, "views/report.html"))
);
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "views/admin-dashboard.html"))
);

app.listen(PORT, () =>
  console.log(`Running at http://localhost:${PORT}`)
);
