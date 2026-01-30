const express = require("express");
const path = require("path");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


const reportRoutes = require("./routes/report");
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Environmental Issue Portal Backend Running 🚀");
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
