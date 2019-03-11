// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/chores", function(req, res) {
    var query = {};
    if (req.query.person_id) {
      query.personId = req.query.person_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.chores.findAll({
      where: query,
      include: [db.person]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

//Update a chore

  
//Delete a chore



// Export routes for server.js to use.......................
module.exports = router;