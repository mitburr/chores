var path = require("path");

module.exports = function(app) {



    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/home.html"));
    });
  
    app.get("/register", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/register.html"));
    });

    app.get("/parentAcct", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/parentaccount.html"));
    });

    app.get("/childAcct", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/childaccount.html"));
      });
  
  };