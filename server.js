const express = require('express');
const request = require('request');
const scrape = require('scrape-it');

const app = express();
const port = 9000;
const open = require('open');

const FEED_API_URL = 'https://www.thescore.com/nba/news?page=';
const STANDINGS_API_URL = 'http://data.nba.net/10s/prod/v1/current/standings_conference.json';

const getScoresApiUrl = date => `http://data.nba.net/prod/v1/${date}/scoreboard.json`;
const getFeedsApiUrl = page => `${FEED_API_URL}${page}`;

app.get('/api/scores/', (req, res) => {
  const currentDate = req.param('date');
  request(getScoresApiUrl(currentDate), (error, response, body) => {
    res.json(body);
  });
});

app.get('/api/standings/', (req, res) => {
  request(STANDINGS_API_URL, (error, response, body) => {
    res.json(body);
  });
});

app.get('/api/feed', (req, res) => {
  const page = req.query.page;
  scrape(getFeedsApiUrl(page), {
    // Fetch the articles
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
  } else {
    open(`http://localhost:${port}`);
  }
});
