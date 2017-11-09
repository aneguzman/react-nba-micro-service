const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = 9000;
const open = require('open');
const _ = require('lodash');
const EMPTY_STRING = '';
const EMPTY_ARRAY = [];
const FEED_API_URL = 'https://www.thescore.com/nba/news?page=';
const STANDINGS_API_URL = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json';

app.get('/api/scores/', function(req, res) {
  let currentDate = req.param('date');
  request(getScoresApiUrl(currentDate), function(error, response, body) {
    res.json(body);
  });
});

app.get('/api/standings/', function(req, res) {
  request(STANDINGS_API_URL, function(error, response, body) {
    res.json(body);
  });
});

app.get('/api/feed', function(req, res) {
  const page = req.param('page');
  request(getFeedsApiUrl(page), function(error, response, body){
    if(!error){
      const $ = cheerio.load(body);
      let title = EMPTY_STRING;
      let imgSrc = EMPTY_STRING;
      let jsonObj = {
        articles: EMPTY_ARRAY
      };
      $('.article-tile-wrapper').filter(function() {
        const article = $(this);
        const articleTitle = article.find('.article-headline');
        const articleImg = article.find('img');
        title = articleTitle ? articleTitle.text() : EMPTY_STRING;
        imgSrc = _.get(articleImg, '[0].attribs.src', EMPTY_STRING);
        jsonObj.articles.push({
          title, 
          imgSrc,
        });
      });

      res.json(jsonObj);
    }
  });
});

const getScoresApiUrl = (date) => `http://data.nba.net/prod/v1/${date}/scoreboard.json`;
const getFeedsApiUrl = (page) => `${FEED_API_URL}${page}`;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
