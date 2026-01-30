const express = require("express");
const router = express.Router();

let reports = [];

// Save report
router.post("/", (req, res) => {
  reports.push(req.body);
  res.json({ message: "Report Saved Successfully" });
});

// Get reports
router.get("/", (req, res) => {
  res.json(reports);
});

module.exports = router;
