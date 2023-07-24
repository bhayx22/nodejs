const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

const geocode = require("./src/utils/geocode");

const publicPath = path.join(__dirname, "/public");
const viewPath = path.join(__dirname, "/src/views");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));

app.use(express.json());
app.get("", (req, res) => {
  res.render("index");
});

geocode("surat", (err, res) => {
  if (err) return console.log(err);
  console.log(res);
});

app.post("/", (req, res) => {
  console.log(req.query.location);
  if (!req.query.location)
    return res.status(404).json({ msg: "location must be require!" });
  const { location } = req.query;
  geocode(location, (err, data) => {
    if (err) return console.log(err);
    res.status(201).json({ data: data });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "xyz",
  });
});

app.get("/about/*", (req, res) => {
  res.render("about", {
    title: "Not found",
    name: "xyz",
  });
});

app.get("*", (req, res) => {
  res.render("notfound");
});

app.listen(port, () => {
  console.log("server port: ", port);
});
