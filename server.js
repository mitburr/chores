
// Dependencies
var express = require("express");
const db = require('./models') //..sequelizer
const jwt_express   = require('express-jwt'); // package to connect express and json web tokens


//dumby data for the server secret key and the user
const JWT_SECRET_KEY            = require('./config/jwt').JWT_SECRET_KEY
const TEST_USER                 = require('./config/jwt').TEST_USER

// var methodOverride = require('method-override')

// Setup Express
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//tell express to use JSON WebTokens. JWT-Express will autofill req.user with the user details
app.use(jwt_express({ secret: JWT_SECRET_KEY}).unless({path: ['/token', '/favicon.ico']}));


// Import routes and give the server access to them.
// var router = require("./controllers/chores_controller.js");
// app.use('/', router); 
require("./controllers/draft1_chores_controller.js")(app);

// app.use(methodOverride('_method')) //..method-overide

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {  //..sequelizer 
  app.listen(PORT, function() {
      console.log("Listening on PORT " + PORT);
  });
});
