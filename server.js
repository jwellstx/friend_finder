var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// require our routing files
var apiRouting = require('./app/routing/apiRouting.js');
var htmlRoutes = require('./app/routing/htmlRoutes.js');
app.use(apiRouting);
app.use(htmlRoutes);

// listen to the incoming route requesuts
app.listen(PORT, err => {
    if (err) throw err;
    console.log("Listening on http://localhost:" + PORT);
});

