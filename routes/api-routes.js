

// var express = require("express");
// var router = express.Router();
var db = require("../models");


//..........................................................

module.exports = function (app) {
    //GET route 'findAll' to get all chores from database.
    app.get("/api/household", function (req, res) {
        db.chores.findAll({})
            .then(function (dbChores) {
                res.json(dbChores);
            })
    });




    //Create a chore
    app.post("/api/chore", function (req, res) {
        console.log(req.body);
        db.chores.create({
            //need to make sure this matches
            chore_name: req.body.chore
        })
            .then(function (dbChore) {
                res.json(dbChore);
            });
    });

    //Assign Chore
    app.put("/api/chore/assign", function (req, res) {
        //not sure this is right
        db.chores.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            }
            )
    });


    //Update Chore Status (complete)


    //Delete a chore

}

// Export routes for server.js to use.......................
module.exports = router;