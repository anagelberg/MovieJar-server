const knex = require("knex")(require("../knexfile"));

const addMovieToDb = async (movieId) => {
  // TODO: write logic. Checks if the movie is in db. If it is, do nothing, but return true. If it isn't, add the movie and return true. Takes the TMDB id to make call.
  return true;
};

const addMovieToJar = (req, res) => {
  res.send("this will add a new movie to jar");
};

const removeMovieFromJar = (req, res) => {
  res.send("This will remove a movie from the jar");
};

module.exports = {
  addMovieToJar,
  removeMovieFromJar,
  addMovieToDb,
};
