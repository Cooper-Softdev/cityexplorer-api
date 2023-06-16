'use strict';

console.log('Am I... alive?');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app=express();
app.use(cors());
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.get('/', (request, response)=>{
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
