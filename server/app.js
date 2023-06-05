require('dotenv').config();
const express = require("express");
const request = require("request");
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://samitamerarar.github.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const API_KEY = process.env.NEWSAPI_KEY;
var country = "ca";
var category = "general";
var page = "1";

app.get("/TopHeadlines", (req, res) => {
  country = req.query.country;
  category = req.query.category;
  page = req.query.page;
  options = {
    url: `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&page=${page}&apiKey=${API_KEY}`,
    headers: {
      'User-Agent': req.get('user-agent')
    }
  };
  request(
    options,
    function (error, response, body) {
      console.log(error);
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.send(error);
      }
    }
  );
});

var language = "en";
var activePage = "1";
var keyword = "";
var date = "";

app.get("/SearchResults", (req, res) => {
  keyword = req.query.keyword;
  language = req.query.language;
  date = req.query.date;
  activePage = req.query.activePage;
  options = {
    url: `https://newsapi.org/v2/everything?q=${keyword}&language=${language}&from=${date}&sortBy=publishedAt&pageSize=20&page=${activePage}&apiKey=${API_KEY}`,
    headers: {
      'User-Agent': req.get('user-agent')
    }
  };
  request(
    options,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {        
        console.log(error);
        res.send(body);
      } else {
        res.send(error);
      }
    }
  );
});

app.listen(port, () => console.log(`Server started on port ${port}`));
