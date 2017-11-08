const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/feed', function(req, res, page){
  // The URL we will scrape from - in our example The scores.

  const feedUrl = 'https://www.thescore.com/nba/news';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(feedUrl, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request

      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

          var $ = cheerio.load(html);

          // Finally, we'll define the variables we're going to capture

          var title, date, feedImgSrc, link;
          var json = { title : "", release : "", rating : ""};
          console.log($);
      }
  })
})

app.listen('9000')

console.log('Magic happens on port 9000');

exports = module.exports = app;