var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scrapping tools are Axios and Cheerio
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

//establish heroku and local port access 
var PORT = 3000;

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

// Connect to the MONGO DB
mongoose.connect("mongodb://localhost/MWS", { useNewUrlParser: true });

// Routes

// A get route for scraping the 
