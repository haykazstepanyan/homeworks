const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "show.html"));
});

app.listen(3000, () => {
  console.log("Running server on 3000 port");
});
