var express = require("express");
var app = express();
app.get("/random/:min/:max", function (req, res) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({ error: "Bad request." });
        return;
    }
    //Passes two parameters in the URL of the request Does error checking.
    //If either number is malformed, responds with an error.
    var result = Math.round((Math.random() * (max - min)) + min);
    //Calculates and sends the result as JSON
    res.json({ result: result });
});
app.listen(3000, function () {
    console.log("App started on port 3000");
});