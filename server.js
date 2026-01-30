const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// ---------- HTML PAGE ROUTES ----------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/report", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "report.html"));
});

app.get("/user-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "user-dashboard.html"));
});

app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin-dashboard.html"));
});

// ---------- API ROUTES ----------
const reportRoutes = require("./routes/report");
app.use("/api/reports", reportRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
