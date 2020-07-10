const express = require("express");
const path = require("path");
const feedRouter = require("./routes/feed");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-COntrol-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-COntrol-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/feed", feedRouter);
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
});
mongoose
  .connect(process.env.MONGO_DB_URI
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
