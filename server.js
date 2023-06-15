'use strict';

console.log('Am I... alive?');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app=express();
app.use(cors());
const axios = require('axios');


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.datatime;
    this.description = cityObj.weather.description;
    this.temp = cityObj.temp;
    this.highTemp = cityObj.high_temp;
    this.lowTemp = cityObj.low_temp;
    this.precip = cityObj.precip;
    this.cloudCover = cityObj.clouds;
    this.feelsLike = cityObj.app_temp;
    this.humidity = cityObj.dewpt;
    this.windSpeed = cityObj.wind_spd;
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    

  }
}

app.get('/weather', async (request, response, next)=>{
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&units=I&key=${process.env.WEATHER_API_KEY}`;
    console.log(weatherURL);
    let weatherDataFromAxios = await axios.get(weatherURL);
    if (weatherDataFromAxios){
      let cityWeather = weatherDataFromAxios.data.data.map((date) => {
        return new Forecast(date);
      });
      response.status(200).send(cityWeather);
    } else {
      response.status(500).send('Location not found');
    }
  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    let keywordFromFront = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key={$process.env.MOVIE_API_KEY}&query=${keywordFromFrontend}`;
    let dataFromAxios = await axios.get(URL);

    let dataToSend = dataFromAxios.data.results.map(movie => new Movie(movie));

    response.status(200).send(dataFromAxios.data);
  } catch(error){
    next(error);
  }
});


app.get('*', (request, response) => {
  response.status(404).send('Sorry, Page not found');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
