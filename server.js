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
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
  })
);
app.set("view engine", "handlebars");

// Connect to the MONGO DB
mongoose.connect("mongodb://localhost/MWS", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongowebs";

mongoose.connect(MONGODB_URI);
// Routes

// A get route for all articles
app.get("/", function(req, res) {
  db.Article.find({ saved: false })
    .then(function(result) {
      // This variable allows us to use the handlebars by passing the results from the db as a value in an object
      var hbsObject = { articles: result };
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Scrapes the tankathon website for article data
app.get("/scraped", function(req, res) {
  // Axios to place server-side http request for data from tankathon.com
  axios.get("https//:wwww.tankathon.com/mock_draft").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h2.entry-title").each(function(i, element) {
      var result = [];

      result.title = $(element).text();

      result.link = $(element)
        .children("a")
        .attr("href");

      result.summary = $(element)
        .siblings(".entry-summary")
        .text()
        .trim();

      db.Article.create(result).then(function(dbArticle) {
        console.log(dbArticle);
      });
    });
  });
  res.send("Done Scraping");
});
