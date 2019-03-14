var path                                               = require("path");
const {JWT_SECRET_KEY}            = require('../config/jwt')

module.exports = function(app) {



    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/assets/html/home.html"));
    });
  
    app.get("/register", verifyToken, function(req, res) {
      console.log(req.body);
      res.sendFile(path.join(__dirname, "../public/assets/html/register.html"));
    });

    app.get("/parentAcct",  function(req, res) { //verifyToken,
      res.sendFile(path.join(__dirname, "../public/assets/html/parentaccount.html"));
    });

    app.get("/childAcct", verifyToken, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/childaccount.html"));
      });
  
  };
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
