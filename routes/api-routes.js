

// var express = require("express");
// var router = express.Router();
var db = require("../models"); 


//..........................................................

module.exports= function(app){
//GET route 'findAll' to get all chores from database.
app.get("/api/household", function(req, res) {
    db.chores.findAll({})
        .then(function(dbChores){
            res.json(dbChores);
        })
  });
  



//Create a chore


//Update a chore

  
//Delete a chore

}

// Export routes for server.js to use.......................
module.exports = router;