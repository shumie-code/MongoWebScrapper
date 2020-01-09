var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Scrapping tools are Axios and Cheerio
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

//establish heroku and local port access 
var PORT = process.env.PORT || 3000;

// Initialize express
var app = express();

// Configure middleware
// Use morgan for logging request
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Using Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

// Connect to the MONGO DB
mongoose.connect("mongodb://localhost/MWS", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongowebs";

mongoose.connect(MONGODB_URI);
// Routes

// A get route for scraping the 
