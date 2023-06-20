'use strict';
const axios = require('axios');

let cache = {};

async function getMovies(request, response, next) {
  try {
    let city=request.query.searchQuery;
    let key = `${city}-Movies`

    if(cache[key] && Date.now() - cache[key].timestamp < 2592000000){
      console.log('Cache was hit!', cache);

      response.status(200).send(cache[key].data);
    } else {
      console.log('No item in cache');
      let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
      let movieDataFromAxios = await axios.get(movieURL);
      if (movieDataFromAxios.data.results){
        let sortedMovies = movieDataFromAxios.data.results.sort((a,b) => b.popularity - a.popularity);
        let popularMovies= sortedMovies.slice(0,5);
        let movieData = popularMovies.map((movie) => {
          return new Movie(movie);
        });
        cache[key] = {
          timestamp: Date.now(),
          data: movieData
        };
        response.status(200).send(movieData);
      } else {
        response.status(500).send('No Movies Found at Location');
      }
    }
  } catch(error) {
    next(error);
  }
}

class Movie {
  constructor(movie){
    this.name = movie.title;
    this.overview = movie.overview;
    this.poster = movie.poster_path;
    this.rating = movie.vote_average;
  }
}

module.exports = getMovies;



// async function getMovies(request, response, next) {
//   try {
//     let city=request.query.searchQuery;
//     let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
//     let movieDataFromAxios = await axios.get(movieURL);
//     if (movieDataFromAxios.data.results){
//       let sortedMovies = movieDataFromAxios.data.results.sort((a,b) => b.popularity - a.popularity);
//       let popularMovies= sortedMovies.slice(0,5);
//       let movieData = popularMovies.map((movie) => {
//         return new Movie(movie);
//       });
//       response.status(200).send(movieData);
//     } else {
//       response.status(500).send('No Movies Found at Location');
//     }
//   } catch(error) {
//     next(error);
//   }
// }

// module.exports = getMovies;

// 'use strict';
// const axios = require('axios');

// async function getMovies(request, response, next) {
//   try {
//     let city=request.query.searchQuery;
//     let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
//     let movieDataFromAxios = await axios.get(movieURL);
//     if (movieDataFromAxios.data.results){
//       let sortedMovies = movieDataFromAxios.data.results.sort((a,b) => b.popularity - a.popularity);
//       let popularMovies= sortedMovies.slice(0,5);
//       let movieData = popularMovies.map((movie) => {
//         return new Movie(movie);
//       });
//       response.status(200).send(movieData);
//     } else {
//       response.status(500).send('I can\'t seem to find anything!');
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

// }

// module.exports = getMovies;