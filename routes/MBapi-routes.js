const router = require('express').Router()

const jwt = require('jsonwebtoken');
const db = require('../models')
const cookieparser = require('cookie-parser');
const { JWT_OPTIONS, JWT_SECRET_KEY, TEST_USER } = require('../config/jwt')
//setup requires
//..........................................................

module.exports = function (app) {
    app.use(cookieparser());
    //GET route 'findAll' to get all chores from database.
    app.get("/api/household", function (req, res) {
        db.chores.findAll({})
            .then(function (dbChores) {
                res.json(dbChores);
            })
    });

    //..........................................................

    //GET route 'findAll' to get all chores from database.
    app.get("/api/household", function (req, res) {
        db.chores.findAll({})
            .then(function (dbChores) {
                res.json(dbChores);
            })
    });

    app.get("/api/tokentest",verifyToken, function (req, res){
        console.log("success!");
        console.log(req.cookies);
        //console.log(res)
    })


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


    //post route which connects to the login button.
    app.post('/login', function (req, res) {
        //Normally, you would fetch the user from the database here.
        //then save the relevant info in user details
        db.person.findOne({
            where: {
                userID: req.body.Username,
            },
        }).then(function (userObj) {
            //test for userObj being found
            if (!userObj) { return res.sendStatus(404) }



            else if (userObj.password === req.body.Password) {
                console.log("succesful login")
                user = {
                    Username: userObj.userID,
                    Password: userObj.password,
                    houseId: userObj.houseId,
                    personId: userObj.personId,
                    isPerson: userObj.isPerson
                }

                jwt.sign(user, JWT_SECRET_KEY, JWT_OPTIONS,
                    function (err, token) {
                        if (err) return res.sendStatus(500).json(err) //do some error checking
                        else {
                            res.json({
                                user,
                                Token: token,
                            })
                        }

                    })
            }
            else {
                res.sendStatus(401).send();
            }
        }).catch(function(err){
            return res.sendStatus(500).json(err) 
        });
    }
    )

//middleware to verify the token

//route related functions
//---------------------------------------
}
let verifyToken = function(req, res, next){
    const token = req.cookies.Token;
    if(token){
            if (err){
                res.sendStatus(403);
            }else if(
                jwt.verify(token, JWT_SECRET_KEY, function(err, data){
                    if (err){res.sendStatus(403)}
                    else{
                        console.log("token verified")
                        return true
                    }
                })
            ); {
                next();
            }
    } else{
        res.sendStatus(403);
    }
}

