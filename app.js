// untuk membaca path yang ada dalam folder project
const fs = require("fs");
const path = require("path");
//1
const express = require("express");
//2
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//4
app.use(express.static("public")); //untuk membaca file css dan JS
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  // const indexPath = path.join(__dirname, "views", "index.html");
  // res.sendFile(indexPath);
  res.render("index");
  // convert template engine menjadi html, dan kemudian di baca oleh browser
});

app.get("/about", function (req, res) {
  // const aboutPath = path.join(__dirname, "views", "about.html");
  // res.sendFile(aboutPath);
  res.render("about");
});

app.get("/recommend", function (req, res) {
  // const recommendPath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(recommendPath);
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurants = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json"); //inisialisasi file yang menjadi wadah

  const fileData = fs.readFileSync(filePath);
  //ngedirect ke folder path
  const storedRestaurants = JSON.parse(fileData);
  // mengubah text data yg terinput dalam JSON menjadi array

  storedRestaurants.push(restaurants); //push ke array di data folder

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  //convert lagi menjadi text format

  res.redirect("/confirm"); // memindahkan ke page lain
});

app.get("/confirm", function (req, res) {
  // const confirmPath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(confirmPath);
  res.render("confirm");
});

app.get("/restaurants", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html"); //langkah kedua
  // res.sendFile(htmlFilePath); //langkah pertama
  res.render("restaurants");
});

//3
app.listen(3000);
