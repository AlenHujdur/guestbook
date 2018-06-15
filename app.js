var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

//setup folder for viewes and view engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//array for all entries as locals 
var entries = [];
app.locals.entries = entries;

//loging every single request
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));


//Routes

//root rout
app.get("/", function(req, res){
  res.render("index");
});

//add
app.get("/add", function(req, res){
  res.render("add");
});

app.post("/add", function(req, res){
  if(!req.body.title || !req.body.body){
   res.status(400).send("Entries must have a title and a body.");
   return;
  }
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  res.redirect("/");
});

app.use(function(req, res) {
  res.status(404).render("404");
});

http.createServer(app).listen(3000, function(){
  console.log("App started on port 3000.");
});

