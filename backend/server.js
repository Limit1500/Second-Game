import express, { json } from "express";
import fs from "fs";

const app = express();

app.use(express.static("../frontend"));
app.use(express.static("../frontend/js"));

app.use(json());

app.listen(3000, () => console.log("http://localhost:3000"));

app.get("/users/:username/:password", (req, res) => {
  const rawData = fs.readFileSync("./database/users.json");
  const jsonData = JSON.parse(rawData);
  const username = req.params.username;
  const password = req.params.password;
  let statusCode = 400;
  let highScore;
  jsonData.forEach((user) => {
    if (user.username == username && user.password == password) {
      statusCode = 200;
      highScore = user.highScore;
    }
  });
  console.log("Request primit");
  let dataSended = {
    username: username,
    password: password,
    highScore: highScore,
  };
  if (statusCode == 200) res.status(statusCode).send(dataSended);
  else res.status(statusCode).send();
});

app.post("/users", (req, res) => {
  const rawData = fs.readFileSync("./database/users.json");
  const jsonData = JSON.parse(rawData);
  const username = req.body.username;
  const password = req.body.password;
  let statusCode = 200;
  jsonData.forEach((user) => {
    if (user.username == username) {
      statusCode = 400;
    }
  });
  if (statusCode != 400) {
    jsonData.push({
      username: username,
      password: password,
      highScore: 0,
    });
    fs.writeFile(
      "./database/users.json",
      JSON.stringify(jsonData),
      "utf8",
      (err) => console.log(err)
    );
  }
  res.status(statusCode).send();
  console.log("Request primit");
});

app.post("/users-addNewHighScore", (req, res) => {
  const rawData = fs.readFileSync("./database/users.json");
  const jsonData = JSON.parse(rawData);
  const username = req.body.username;
  const password = req.body.password;
  const newHighScore = req.body.newHighScore;
  let statusCode = 400;
  jsonData.forEach((user) => {
    if (user.username == username) {
      statusCode = 200;
      user.highScore = newHighScore;
    }
  });
  fs.writeFile(
    "./database/users.json",
    JSON.stringify(jsonData),
    "utf8",
    (err) => console.log(err)
  );
  res.status(statusCode).send();
  console.log("Request primit");
});
