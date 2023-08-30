const knex = require("knex")(require("../knexfile"));

const addMovie = (req, res) => {
  res.send("this will add a new movie to jar");
};

const removeMovie = (req, res) => {
  res.send("This will remove a movie from the jar");
};

module.exports = {
  addMovie,
  removeMovie,
};
