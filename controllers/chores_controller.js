// var express = require("express");
// var router = express.Router();
// var models = require("../models"); 
// =======
//USING ROUTES FOLDER (api-routes.js or html-routes.js)

// var express = require("express");
// var router = express.Router();
// var models = require("../models"); 

// //..........................................................
// =======

// //..........................................................

// =======

// //GET route 'findAll' to get all chores from database.
// router.get("/", function(req, res) {
//     res.redirect("/index");
//   });
  
//   //GET route 'findAll' to get all burgers from database.
//   router.get('/index', function(req, res){
//     models.chores.findAll({})
//     .then(function(data) {
//       var hbsObject = 
//       {
//         chores: data
//       }; 
//       res.json(hbsObject); 
//     });
//   });
// //Create a chore

// // Create a New Burger
// router.post('/', function (req, res) {
//   models.chore.create(
//     {
//       chore_name: req.body.burger_name,            
//     })
//     .then (function() {
//     res.redirect("/index");
//   }); 
// });


// //Update a chore
// =======
//Create a chore

// Create a New Burger
// router.post('/', function (req, res) {
//   models.chore.create(
//     {
//       chore_name: req.body.burger_name,            
//     })
//     .then (function() {
//     res.redirect("/index");
//   }); 
// });


//Update a chore

  
// //Delete a chore



// // Export routes for server.js to use.......................
// module.exports = router;