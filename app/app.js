const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./src/routes/index");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname)));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res, next) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../build/index.html"));
  next();
});

app.use("/api", router);

app.listen(3001, () => {
  console.log("서버시작");
});
