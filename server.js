'use strict';

console.log('Am I... alive?');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

app.use(cors());


const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`We are running ${PORT}!`));

app.get('/', (request, response)=>{
  response.status(200).send('Test!');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.get('*', (request, response)=>{
  response.status(404).send('Sorry, page not found');
});

app.use((error, request, response, next)=>{
  console.log(error.message);
  response.status(500).send(error.message);
});

// app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// app.get('/', (request, response) => {
//   response.status(200).send('Test!');
// });

// app.get('/weather', (request, response, next) => {
//   getWeather(request.query.lat, request.query.lon)
//     .then(weatherData => response.json(weatherData))
//     .catch(next);
// });

// app.get('/movies', (request, response, next) => {
//   getMovies(request.query.city)
//     .then(movieList => response.json(movieList))
//     .catch(next);
// });

// app.use((error, request, response, next) => {
//   console.error(error.stack);
//   response.status(error.status || 500).send({
//     error: {
//       message: error.message,
//       status: error.status || 500,
//       stack: error.stack,
//     },
//   });
// });

// app.use((error, request, response, next) => {
//   console.error(error.stack);
//   response.status(500).send('Something broke!');
// });

// module.exports = app;