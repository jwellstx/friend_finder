var express = require('express');
var path = require('path');
var app = module.exports = express();  // so we can access in server.js

// Used to request logo image from server to front end
app.get("/logo.png", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/images/friendfinder.png"))
})

// push survey.html when survey route is hit
app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
})

// catch-all send to home.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
})