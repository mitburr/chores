
// Dependencies
var express = require("express");
const db = require('./models') //..sequelizer
// var methodOverride = require('method-override')

// Setup Express
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var router = require("./controllers/chores_controller.js");
app.use('/', router); 

// app.use(methodOverride('_method')) //..method-overide

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {  //..sequelizer 
  app.listen(PORT, function() {
      console.log("Listening on PORT " + PORT);
  });
});
