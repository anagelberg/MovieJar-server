const knex = require("knex")(require("../knexfile"));

const getJars = (req, res) => {
  res.send("this will return a list of jars the user is contributing to");
};

const editUserMovieData = (req, res) => {
  res.send("This will edit user data on a movie");
};

const addUserMovieData = (req, res) => {
  res.send("This will add user data for a movie");
};

module.exports = {
  getJars,
  editUserMovieData,
  addUserMovieData,
};
