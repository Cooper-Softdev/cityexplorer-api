'use strict';

console.log('Am I... alive?');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: ['https://main--cooper-weather-app.netlify.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://city-explorer-api-server-txy0.onrender.com");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.get('/', (request, response) => {
  response.status(200).send('Test!');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).send({
    error: {
      message: error.message,
      status: error.status || 500,
      stack: error.stack,
    },
  });
});

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

module.exports = app;
