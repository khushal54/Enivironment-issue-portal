const express = require("express");
const router = express.Router();

let reports = [];

// POST
router.post("/", (req, res) => {
  const newReport = req.body;
  reports.push(newReport);
  res.json({ message: "Report saved" });
});

// GET
router.get("/", (req, res) => {
  res.json(reports);
});

module.exports = router;
