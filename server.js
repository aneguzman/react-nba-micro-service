const express = require('express');
const request = require('request');
const scrape = require('scrape-it');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const FEED_API_URL = 'https://www.thescore.com/nba/news?page=';
const STANDINGS_API_URL = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json';

const getScoresApiUrl = date => `http://data.nba.net/prod/v1/${date}/scoreboard.json`;
const getFeedsApiUrl = page => `${FEED_API_URL}${page}`;

/**
 * Request the list of NBA scores for a given date.
 * @param {string} date - the date of the scores.
 * @return {Object} the JSON object with the data.
 */
app.get('/api/scores/', (req, res) => {
  const { date } = req.query;
  request(getScoresApiUrl(date), (error, response, body) => {
    res.json(body);
  });
});

/**
 * Request the list of NBA standings.
 * @return {Object} the JSON object with the data.
 */
app.get('/api/standings/', (req, res) => {
  request(STANDINGS_API_URL, (error, response, body) => {
    res.json(body);
  });
});

/**
 * Request a list of NBA articles.
 * @param {number} page - the page number.
 * @return {Object} the JSON object with the data.
 */
app.get('/api/feed', (req, res) => {
  const { page } = req.query;
  scrape(getFeedsApiUrl(page), {
    articles: {
      listItem: '.article-tile-wrapper',
      data: {
        title: '.article-headline',
        thumbnail: {
          selector: '.article-thumbnail > img',
          attr: 'src',
        },
      },
    },
  })
    .then(article => res.json(article));
});

app.listen(port, (err) => {
  if (err) {
    const error = new Error(err);
    throw error;
  }
});
