var express = require('express');
var path = require('path');
var fs = require('fs');
// export the app so server.js can import it
var app = module.exports = express();  // so we can access in server.js

// Just used to print the current friends in our DB
app.get("/api/friends", (req, res) => {
    res.sendFile(path.join(__dirname, "../data/friends.js"));
});

// takes post request from survey.html
// 1. checks if user name is already taken
// 2. compares current friend against all friends and determines closest compatability
// 3. return bad response if user name is taken
// 4. return closest friend name and image
// 5. add new user to our current friends repository in friends.js
app.post("/api/friends", (req, res) => {
    // .json() and .urlencoded() need to process req.body
    fs.readFile("./app/data/friends.js", "utf-8", (err, data) => {
        var differences = [];
        var userNameTaken = false;
        data = JSON.parse(data);
        for (var x = 0; x < data.length; x++) {
            if (req.body.name === data[x].name) userNameTaken = true;

            var total = 0;
            for (var y = 0; y < 10; y++) {
                total += Math.abs(parseInt(req.body.scores[y]) - parseInt(data[x].scores[y]));
            }
            differences.push(parseInt(total));
        }

        if (userNameTaken) {
            res.json({ 
                data: "",
                code: "101"
            });
        }
        else {
            // create some randomness where multiple people match
            var minNum = Math.min(...differences)  // ... creates  new array and not a pointer
            var matches = [];
            // find all friends who have the same difference number
            for (var x = 0; x < differences.length; x++) {
                if (differences[x] === minNum) {
                    matches.push(data[x])
                }
            }
            // find random index of friends who match
            var randomIndex = Math.floor((Math.random() * matches.length));
            var friend = data[randomIndex];

            res.json({ 
                // data: data[differences.indexOf(Math.min(...differences))],
                data: friend,
                code: "100"
            });
            data.push(req.body);
            fs.writeFile("./app/data/friends.js", JSON.stringify(data), (err) => {
                if (err) throw err;
                console.log("New friend added!");
            });
        }
    });
});