const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect("mongodb://localhost/marvel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log({ errorDB: error });
});
db.once("open", () => {
  console.log("Connected to the Marvel Database");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
