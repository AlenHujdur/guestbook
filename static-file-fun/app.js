var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

app.use(function(req, res, next) {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  var filePath = path.join(__dirname, "static", req.url);
  //res.redirect('http://klix.ba');
  res.sendFile(filePath);
  next();
});

app.listen(3000, function() {
  console.log("App started on port 3000");
});

