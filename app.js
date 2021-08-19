const express = require("express");
const https = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var query = req.body.cityName;
    var apiKey = "62c299bf98cdf184aebb37ac2674e95d";
    var unit = "metric";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response) {
        console.log(response.status);

        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageURL = ""

            res.write("<h1>The temperature in " + query + " is " + temp + " degree celscius </h1><h1>The weather is currently " + description);
            res.write("<img src= 'http://openweathermap.org/img/wn/" + icon + "@2x.png'/>");
            res.send();
        })
    });
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});