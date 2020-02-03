// Dependencies
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// Initialize Express App
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
// Require set up handlebars
var expbhs = require("express-handlebars");
app.engine(
  "handlebars",
  expbhs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Connecting to MongoDB
const MONGODB_URI = 
  process.env.MONGODB_URI || "mongodb://localhost/scraper_basket";
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Connected to Mongoose!");
  });

  var routes = require("./controller/controller.js");
  app.use("/", routes);
  // Create localhost port
  var port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log("Listening on PORT " + port);
  });
