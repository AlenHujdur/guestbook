var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("2ec9b1fa287a1af511372484308aa326");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  var zipcode = req.params[0];
  var location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude, longitude, function(err, data) {
    if (err) {
      next();
      return;
    }

    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature
    });
  });
});

app.use(function(req, res) {
  res.status(404).render("404");
});
app.listen(3000);

// var path = require('path');
// var express = require('express');
//var zipdb = require('zippity-do-dah');
//var ForecastIo = require('forecast.io');
//'use strict';
//const ForecastIo = require('forecast-io');
// var zipdb = require("zippity-do-dah");
// var ForecastIo = require("forecastio");
// var app = express();
// var weather = new ForecastIo('2ec9b1fa287a1af511372484308aa326');


// // var options = {
// //   APIKey: process.env.DARKSKY_API_KEY,
// //   timeout: 1000
// // },
// // darksky = new DarkSky(options);
// app.use(express.static(path.resolve(__dirname, "public")));

// app.set("views", path.resolve(__dirname, "public"));
// app.set("view engine", "ejs");

// app.get("/", function(req, res){
//   res.render("index");
// });

// app.get(/^\/(\d{5})$/, function(req, res, next) {
//   var zipcode = req.params[0];
//   var location = zipdb.zipcode(zipcode);
//   if (!location.zipcode) {
//     next();
//   return;
// }

// var latitude = location.latitude;
// var longitude = location.longitude;
// weather.forecast(latitude, longitude, function(err, data) {
//   if (err) {
//     next();
//   return;
// }

// res.json({
//     zipcode: zipcode,
//     temperature: data.currently.temperature});
//   });
// });
// // http.createServer(app).listen(3000, function(){
// //   console.log("App started on port 3000.");
// // });
// app.use(function(req, res){
//     res.status(404).render("404");
// });
// app.listen(3000);
