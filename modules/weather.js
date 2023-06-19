'use strict';
const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let weatherURL = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&units=I&key=${process.env.WEATHER_API_KEY}`;
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
}

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

module.exports = getWeather;



// 'use strict';
// const axios = require('axios');

// async function getWeather(request, response, next) {
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;

//     let weatherURL = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&units=I&key=${process.env.WEATHER_API_KEY}`;
//     let weatherDataFromAxios = await axios.get(weatherURL);
//     if (weatherDataFromAxios){
//       let cityWeather = weatherDataFromAxios.data.data.map((date) => {
//         return new Forecast(date);
//       });
//       response.status(200).send(cityWeather);
//     } else {
//       response.status(500).send('Location not found');
//     }
//   } catch(error) {
//     console.log(error.message);
//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log('Error', error.message);
//     }
//     response.status(500).send(`Something went wrong: ${error.message}`);
//   }
// }

// class Forecast {
//   constructor(cityObj) {
//     this.date = cityObj.datatime;
//     this.description = cityObj.weather.description;
//     this.temp = cityObj.temp;
//     this.highTemp = cityObj.high_temp;
//     this.lowTemp = cityObj.low_temp;
//     this.precip = cityObj.precip;
//     this.cloudCover = cityObj.clouds;
//     this.feelsLike = cityObj.app_temp;
//     this.humidity = cityObj.dewpt;
//     this.windSpeed = cityObj.wind_spd;
//   }
// }

// module.exports = getWeather;