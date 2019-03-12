var path = require("path");

module.exports = function(app) {



    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/master.html"));
    });
  
    app.get("/register", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/html/register.html"));
    });

    app.get("/parentAcct", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/assets/html/parentaccount.html"));
    });

    // CHILD HTML HAS NOT BEEN CREATED YET
    // app.get("/childAcct", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/html/childaccount.html"));
    //   });
  
  };