const express = require("express");
const router = express.Router();

let reports = [];

router.post("/", (req, res) => {
  reports.push(req.body);
  res.json({ message: "Report saved" });
});

router.get("/", (req, res) => {
  res.json(reports);
});

module.exports = router;

