const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "../test/build")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../test/build/index.html"));
  next();
});

app.get("/test", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../test/build/index.html"));
  next();
});

app.get("/app", (req, res, next) => {
  console.log("확인");
  res.sendFile(path.join(__dirname, "/app.html"));
  // res.send("확인");
  next();
});

app.listen(3000, () => {
  console.log("서버시작");
});
