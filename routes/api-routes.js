const router        = require('express').Router()
const jwt           = require('jsonwebtoken');
const db            = require('../models')
const {JWT_OPTIONS, JWT_SECRET_KEY, TEST_USER}            = require('../config/jwt')

//setup requires
//..........................................................

module.exports= function(app){
//GET route 'findAll' to get all chores from database.
app.get("/api/household", function(req, res) {
    db.chores.findAll({
        
            where: {
                houseId: "the Johnsons"
            }
        
    })
        .then(function(dbChores){
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
        //not sure this is right naming
        db.chores.update({personId:req.body.person},
            {
                where: {
                    id: req.body.id
                }
            }
            )
    });


    //Update Chore Status (complete)
    app.put("/api/chore/completion", function(req, res){
        db.chores.update( 
            {chore_complete:TRUE},
            {
                where: {
                    id: req.body.id
                }
            }

        )
    })

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
}