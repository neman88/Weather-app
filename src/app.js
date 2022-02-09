const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const port = process.env.PORT || 3000;
// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handler engines and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Syed Neman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "andrew",
    help: "PLease hep me i am dying of this unemployement disease",
  });
});

app.get("/weather", (req, res) => {
  const longitude = req.query.lon;
  const latitude = req.query.lat;
  if (!longitude && !latitude) {
    return res.send({
      Error: "Latitude or longitude not provided",
    });
  }

  geoCode(longitude, latitude, (error, { city, country, state } = {}) => {
    if (error) {
      return res.send({ error });
    }

    // console.log("Error", error);
    // console.log("Data", city, country, state);

    foreCast(city, country, (error, data) => {
      console.log("Successfully got the result");
      console.log(data);
      console.log(data.weather[0].description);

      res.send({
        // weather: data.weather[0].description,
        // city: data.name,
        data: data,
      });

      // console.log(error);
      // console.log(data);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      Error: "Please provide the search",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "andrew",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "andrew",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up");
});
