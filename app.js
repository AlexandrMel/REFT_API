const express = require("express");
const path = require('path')
const feedRouter = require("./routes/feed");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use("/feed", feedRouter);
mongoose
  .connect(
    "mongodb+srv://AlexMel:Strechii1989@newsdb-x7jaj.mongodb.net/messages?retryWrites=true&w=majority",
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
