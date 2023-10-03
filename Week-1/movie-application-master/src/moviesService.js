// Import the axios library
const axios = require("axios");

const getMovies = (done) => {
  axios.get("http://localhost:3000/movies/").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const getMoviesById = (movieId, done) => {
  // get movie by id
};

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
};

const updateMovie = function (movieId, updateData, done) {
  // update movie details of a specific movie
};

const deleteMovieById = async function (movieId, done) {
  try {
    const response = await axios.delete("http://localhost:3000/movies/${id}");
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
};
