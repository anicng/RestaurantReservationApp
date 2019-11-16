var express = require("express");
var path = require("path");
var fs = require("fs");

var PORT = 3000;
var app = express();

// Create an array to hold waitlist reservations
var waitlist = [];
// Create an array to hold reservations
var reservations = [];

// Set up express to handle parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reserve", function (req, res) {
    return res.json(reservations);
})

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.post("/api/reserve", function (req, res) {
    var newReservation = req.body;
    if (reservations.length < 5) {
        reservations.push(newReservation);
        res.json(newReservation);
        console.log("reservations", reservations);
    } else {
        waitlist.push(newReservation);
        res.json(newReservation);
        console.log("waitlist", waitlist);
    }
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});