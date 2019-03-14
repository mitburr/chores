const router = require('express').Router()

const jwt = require('jsonwebtoken');
const db = require('../models')
const cookieparser = require('cookie-parser');
const { JWT_OPTIONS, JWT_SECRET_KEY} = require('../config/jwt')
//setup requires
//..........................................................

module.exports = function (app) {
    app.use(cookieparser());
    app.get("/api/household", function(req, res) {
        let houseId = req.cookies.houseId;

        db.chore.findAll({
            include: [{
                model:db.person, 
                where: {
                    houseId  //req.params.houseId...
                }
            }]
        
    })
            .then(function(dbChores){
                res.json(dbChores);
            })
      });
    
    
    //Get the children in the household
    app.get("/api/household/people", function(req, res){
        let houseId = req.cookies.houseId;
        db.person.findAll({
            where: {
                houseId //req.params.houseId...
            }
        })
            .then(function(dbChores){
                res.json(dbChores);
            })
    });
    
    //Get the chores for a specific child
    app.get("/api/household/child", function(req, res) {
        let personId = req.cookies.personId;
        db.chore.findAll({
            
                where: {
                    personId //req.params.personId...
                    
                }
    
            
        })
            .then(function(dbChores){
                res.json(dbChores);
            })
      });
    
      //POST ROUTES------------------------------------------
    
        //Register a person
        app.post("/api/register", function(req, res){
            db.person.create({
                person_name: "Sally Jordan", //req.body.person_name
                person_email: "Sally.Jordan@gmail.com", //req.body.person_email
                isParent: 1, //req.body.isParent
                userID: "sallyjord", //req.body.userID
                password: "password123", //req.body.password
                houseId: "Jordan"//req.body.houseId
            })
        })
    
        //Create a chore
        app.post("/api/chore", function (req, res) {
            let personId = req.cookies.personId;
            console.log(req.body);
            db.chore.create({
                //need to make sure this matches
                chore_name: "clean windows",//req.body.chore
                personId,
            })
                .then(function (dbChore) {
                    res.json(dbChore);
                });
        });
    
    
    //PUT ROUTES-----------------------------------------------
        //Assign Chore
        app.put("/api/chore/assign", function (req, res) {
            let personId = req.cookies.personId
            //not sure this is right naming
            db.chore.update({personId}, //req.body.person
                {
                    where: {
                        id: 3//req.body.id
                    }
                }
                )
                .then(function (dbChore) {
                    res.json(dbChore);
                });
        })
    
    
        //Update Chore Status (complete)
        app.put("/api/chore/completion", function(req, res){
            db.chore.update( 
                {chore_complete:1},
                {
                    where: {
                        id:1//req.body.id
                    }
                }
            )
            .then(function (dbChore) {
                res.json(dbChore);
            });
        });
    
        //Reject the chore done status
        app.put("/api/chore/rejection", function(req, res){
            db.chore.update( 
                {chore_complete:0},
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
        //fetch the user from the db
        db.person.findOne({
            where: {
                userID: req.body.Username,
            },
        }).then((function (userObj) {
            //test for userObj being found, 404 is a "not found" status
            if (!userObj) { return res.sendStatus(404) }


            //then test the password in the userobj
            else if (userObj.password === req.body.Password) {
                console.log("succesful login")
                //declare an object for what we need from the database user object
                user = {
                    Username: userObj.userID,
                    Password: userObj.password,
                    houseId: userObj.houseId,
                    personId: userObj.personId
                }
                //create a token which connects to the user object
                //_SECRET KEY NEEDS TO BE UPDATED_
                //options contains the algorithm method for determining the token
                jwt.sign(user, JWT_SECRET_KEY, JWT_OPTIONS,
                    //callback function to send the token
                    function (err, token) {
                        //do some error checking
                        if (err) return res.sendStatus(500).json(err)
                        else {
                            //send the relevant user object and the token to the front end
                            res.json({
                                user,
                                Token: token,
                            })
                        }

                    })
            }
            else {
                //this else connects to the password evaluation, 401 is an "unauthorized" error
                res.sendStatus(401).send();
            }
        })).catch(function (err) {
            //catch if there are issues unrelated to authentication
            return res.sendStatus(500).json(err)
        });
    }
    )

    //middleware to verify the token, place in the middle of any path's arguments. 
    //middleware is a functionality of Express I think, but I'm unsure
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
