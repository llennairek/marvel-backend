//packages imports
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//routes imports
const comicsRoute = require("./routes/comics");
const charactersRoute = require("./routes/characters");

//initialize express and add middlewares
const app = express();
app.use(cors());
app.use(formidable());
app.use("/comics", comicsRoute);
app.use("/characters", charactersRoute);

//Database config and connection
mongoose.connect("mongodb://localhost/marvel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//database events
const db = mongoose.connection;
db.on("error", (error) => {
  console.log({ errorDB: error });
});
db.once("open", () => {
  console.log("Connected to the Marvel Database");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue sur l'api marvel" });
});

// all routes that do not match
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

//server launch
app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
