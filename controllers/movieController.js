const knex = require("knex")(require("../knexfile"));
require("dotenv").config();
const axios = require('axios');

const { TMDB_API_KEY } = process.env;

// Checks if the movie is in db. If it is, returns true. If it isn't, add the movie and return true. Returns false if unable to add the movie with specified Id. Takes the TMDB id to make call.
const addMovieToDb = async (movieId) => {

  const moviesInDb = await knex("movie").where({ id: movieId });

  if (moviesInDb.length > 0) {
    console.log("Movie exists in the database");
    return true;

  } else { // Make API call to get movie details
    try {
      const tmdbData = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
      const newMovie = {
        id: movieId,
        title: tmdbData.data.original_title,
        poster_url: tmdbData.data.poster_path,
        description: tmdbData.data.overview,
        rating: tmdbData.data.vote_average,
        year: Number(tmdbData.data.release_date.split("-")[0]),
        run_time: tmdbData.data.runtime,
        genres: tmdbData.data.genres.map(genre => genre.name).join(", "),
        imdb_id: tmdbData.data.imdb_id
      };
      try {
        const movieAdded = await knex("movie").insert(newMovie)
        if (movieAdded) return (true);
      } catch (err) {
        console.log("Error adding movie to db", err);
        return false;
      }
    }
    catch (err) {
      console.log("Error response from the TMDB API", err);
      return false;
    }
  }
};


// Add a movie to a jar. Checks if valid movie & jar, adds jar to db if needed. 
const addMovieToJar = async (req, res) => {
  const movieAdded = await addMovieToDb(req.params.movieid);
  const existingData = await knex("jar_movie_join").where({ jar_id: req.params.jarid, movie_id: req.params.movieid });
  const existingJar = await knex("jar").where({ id: req.params.jarid });

  if (!movieAdded) {
    res.status(400).send("Could not add that movie to database. Ensure that the id is the correct TMDB id");
  } else if (existingData.length > 0) {
    res.status(400).send("That jar already contains that movie");
  } else if (existingJar.length < 1) {
    res.status(400).send("Invalid jar id");
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
  addMovieToDb,
};
