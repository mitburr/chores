const router = require('express').Router()
const jwt = require('jsonwebtoken');
const db = require('../models')
const cookieparser = require('cookie-parser');

const { JWT_OPTIONS, JWT_SECRET_KEY, TEST_USER } = require('../config/jwt')

//setup requires
//..........................................................


//GET ROUTES----------------------------------------------
module.exports = function (app) {
    //cookieparser is necessary for reading the user data
    app.use(cookieparser());
    //Get the chores for a parent in that household
    app.get("/api/household", function (req, res) {
        let houseId = req.cookies.houseId;
        db.chore.findAll({
            include: [{
                model: db.person,
                where: {
                    houseId,  //req.params.houseId...
                }
            }]

        })
            .then(function (dbChores) {
                res.json(dbChores);
                console.log(dbChores);
            })
    });


    //Get the children in the household
    app.get("/api/household/people", function (req, res) {
        let houseId = req.cookies.houseId;
        db.person.findAll({
            where: {
                houseId //req.params.houseId...
            }
        })
            .then(function (dbChores) {

                res.json(dbChores);
            })
    });

    //Get the chores for a specific child
    app.get("/api/household/child", function (req, res) {
        let personId = req.cookies.personId;
        db.chore.findAll({

            where: {
                personId //req.params.personId...
            }


        })
            .then(function (dbChores) {
                res.json(dbChores);
            })
    });

    //POST ROUTES------------------------------------------

    //Register a person
    app.post("/api/register", function (req, res) {
        db.person.create({
            person_name: req.body.person_name,
            // person_email: req.body.person_email,
            isParent: req.body.isParent,
            userID: req.body.userID,
            password: req.body.password,
            houseId: req.body.houseId
        })
    })

    //Create a chore
    app.post("/api/chore", function (req, res) {
        let personId = req.cookies.personId;
        db.chore.create({
            chore_name: req.body.chore_name,
            personId: req.body.personId
        })
            .then(function (dbChore) {
                res.json(dbChore);
            });
    });


    //PUT ROUTES-----------------------------------------------
    //Assign Chore
    app.put("/api/chore/reassign", function (req, res) {
        let personId = req.cookies.personId;
        db.chore.update({ personId },
            {
                where: {
                    id: req.body.chore_id
                }
            }
        )
            .then(function (dbChore) {
                res.json(dbChore);
            });
    });


    //Update Chore Status (complete)
    app.put("/api/chore/completion", function (req, res) {
        db.chore.update(
            { chore_complete: 1 },
            {
                where: {
                    id: 1//req.body.id
                }
            }
        )
            .then(function (dbChore) {
                res.json(dbChore);
            });
    });

    //Reject the chore done status
    app.put("/api/chore/rejection", function (req, res) {
        db.chore.update(
            { chore_complete: 0 },
            {
                where: {
                    id: 1//req.body.id
                }
            }

        )
            .then(function (dbChore) {
                res.json(dbChore);
            });
    });

    //post route which connects to the login button.
    app.post('/login', function (req, res) {
        //Normally, you would fetch the user from the database here.
        //then save the relevant info in user details
        db.person.findOne({
            where: {
                userID: req.body.Username,
            },
        }).then((function (userObj) {
            //test for userObj being found
            if (!userObj) { return res.sendStatus(404) }


            else if (userObj.password === req.body.Password) {
                console.log(userObj.id);

                user = {
                    Username: userObj.userID,
                    Password: userObj.password,
                    houseId: userObj.houseId,
                    personId: userObj.id,
                    isParent: userObj.isParent
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
        })).catch(function (err) {
            return res.sendStatus(500).json(err)
        });
    })


}
let verifyToken = function (req, res, next) {
    //declare the token from each request. 
    //The token is sent automatically in a cookie,
    // cookie_parser allows us to read the cookie easily
    const token = req.cookies.Token;
    //first determine if a token is found
    if (token) {
        //with this nested if I verify the token. 
        //the callback in jwt.verify will return true if verified w/ jwt's verified.
        //the contents of the if statement are actually just the next() function
        if (jwt.verify(token, JWT_SECRET_KEY, function (err, data) {
            //self explanatory: not verified => forbidden.
            //interestingly, this does succesfully end the verifyToken function as if it was returned. 
            if (err) { res.sendStatus(403) }
            //return true to fulfill the if, token verified for testing
            else {
                console.log("token verified")
                return true
            }
        })
        ); {
            //next() is what makes the middleware function continue to the next function
            next();
        }
    } else {
        //403 means forbidden, slightly stronger than unauthorized.
        //this is else if the token is not found in cookies. 
        res.sendStatus(403);
    }
}