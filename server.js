const express = require("express");
const path = require("path");

const app = express();

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Static Files
// --------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// Routes
// --------------------
const reportRoutes = require("./routes/report");
app.use("/api/reports", reportRoutes);

// --------------------
// Home Route (Test)
// --------------------
app.get("/", (req, res) => {
  res.send("Environmental Issue Portal Backend Running 🚀");
});

// --------------------
// Start Server
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
