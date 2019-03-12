const router        = require('express').Router()
const jwt           = require('jsonwebtoken');
const db            = require('../models')
const {JWT_OPTIONS, JWT_SECRET_KEY, TEST_USER}            = require('../config/jwt')

//setup requires
//..........................................................

module.exports= function(app){
//GET route 'findAll' to get all chores from database.
app.get("/api/household", function(req, res) {
    db.chores.findAll({})
        .then(function(dbChores){
            res.json(dbChores);
        })
  })};
  



//Create a chore


//Update a chore

  
//Delete a chore


//post route which connects to the login button.
router.post('/token', function(req,res) {
    //Normally, you would fetch the user from the database here.
    //then save the relevant info in user details
    const userDetails = {
        username: TEST_USER.username,
        id: TEST_USER.id,
        foo: TEST_USER.foo,
    };


    // do some sort of check that the user/password is correct:
    //normally, you would do this with the user in the database. 
    //in this case, we just have a "test user" saved in a file somewhere
    if (req.body.username === TEST_USER.username && req.body.password === TEST_USER.password) {

        jwt.sign(userDetails, JWT_SECRET_KEY, JWT_OPTIONS, 
        function(err, token) {
            if (err) return res.sendStatus(500).json(err) //do some error checking
            res.json({
                user: userDetails,
                token: token,
            })

        })

    }
    else {
        res.sendStatus(401).send();
    }
});

// Export routes for server.js to use.......................
module.exports = router;