const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

let reports = [];

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(express.static("views"));

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

app.post("/api/reports", (req, res) => {
  reports.push(req.body);
  res.json({ status: "ok" });
});

app.get("/api/reports", (req, res) => {
  res.json(reports);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
