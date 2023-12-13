const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

// Add a movie to a jar. Checks if valid movie & jar, adds jar to db if needed. 
const addMovieToJar = async (req, res) => {
  const existingData = await knex("jar_movie_join").where({ jar_id: req.params.jarid, movie_id: req.params.movieid });

  if (existingData.length > 0) {
    res.status(400).send("That jar already contains that movie");
  } else {
    knex("jar_movie_join").insert({ jar_id: req.params.jarid, movie_id: req.params.movieid }).then(() => {
      res.send("Movie added to jar");
    }).catch(err => {
      res.status(500).send("Error adding movie on server side");
    })
  };
}


/* Remove a movie from jar */
const removeMovieFromJar = (req, res) => {
  knex("jar_movie_join")
    .where({ jar_id: req.params.jarid, movie_id: req.params.movieid })
    .del()
    .then(numDel => {
      numDel > 0
        ? res.send("Movie deleted from jar")
        : res.status(404).send("Nothing to delete")
    }).catch(err => {
      console.log(err);
      res.status(500).send("Internal error deleting movie from jar");
    })
};


/* Exports */
module.exports = {
  addMovieToJar,
  removeMovieFromJar,
  // addMovieToDb,
};
