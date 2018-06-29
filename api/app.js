var express = require("express");

var app = express();
var apiVersion1 = require("./api1.js");
var apiVersion2 = require("./api2.js");

app.get("/random/:min/:max", function(req, res) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
    res.status(400);
    res.json({ error: "Bad request." });
    return;
    }

    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({ result: result });
});
app.use("/v1", apiVersion1);
app.use("/v2", apiVersion2);

app.get("/", function(req,res){
    res.send("you just sent a GET request friend.");
})

app.listen(3000, function(){
    console.log("App started on port 3000");
})
