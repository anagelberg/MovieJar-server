const knex = require("knex")(require("../knexfile"));
const movieController = require("./movieController");

/* Validates that the user exists -- will expand more later to accomodate more users */
const isUserValid = async (userId) => {
  return userId === 1;
};

/* Checks if user data exists for a movie */
const isUserMovieData = async (userId, movieId) => {
  const data = await knex("user_movie")
    .select("*")
    .where({ user_id: userId, movie_id: movieId });

  return data.length > 0;
};

/* Get all jars associated with a userId */
const getJars = async (req, res) => {
  const userId = Number(req.params.userid);
  const validUser = await isUserValid(userId);
  if (validUser) {
    knex("jar_user_join")
      .select("jar_id", "name", "creator_id")
      .where({ user_id: userId })
      .join("jar", "jar.id", "=", "jar_user_join.jar_id")
      .then((data) => {
        res.send(data);
      });
  } else {
    res.status(404).send("Invalid user id");
  }
};

const editUserMovieData = async (req, res) => {
  const userId = Number(req.params.userid);
  const movieId = Number(req.params.movieid);
  const validUser = await isUserValid(userId);
  const dataExists = await isUserMovieData(userId, movieId);

  if (validUser && dataExists) {
    const newUserMovieData = {
      movie_id: movieId,
      user_id: userId,
      ...req.body,
    };
    knex("user_movie")
      .where({ movie_id: movieId, user_id: userId })
      .update(newUserMovieData)
      .then(() => {
        res.send("Successfully updated user data");
      })
      .catch((err) => {
        console.log(err);
        //TODO: add better validation later to differentiate server error vs. req format error
        res.status(400).send("Check input format");
      });
  } else {
    res
      .status(400)
      .send(
        "Data on user/movie doesn't exist. Use a post request to create instead."
      );
  }
};

const addUserMovieData = async (req, res) => {
  const userId = Number(req.params.userid);
  const movieId = Number(req.params.movieid);
  const validUser = await isUserValid(userId);
  const dataExists = await isUserMovieData(userId, movieId);
  const movieAdded = await movieController.addMovieToDb(movieId);
  //TODO: add movieAdded validation to make sure movie in the datebase!

  if (validUser && !dataExists) {
    const newUserMovieData = {
      movie_id: movieId,
      user_id: userId,
      ...req.body,
    };
    knex("user_movie")
      .insert(newUserMovieData)
      .then(() => {
        res.send("Successfully added user data");
      })
      .catch((err) => {
        console.log(err);
        //TODO: add better validation later to differentiate server vs. req format error
        res.status(400).send("Check input format");
      });
  } else if (dataExists) {
    res
      .status(400)
      .send("User data already exists. Use put command to edit it instead.");
  } else {
    res.status(400).send("Invalid request. That user id is invalid.");
  }
};

module.exports = {
  getJars,
  editUserMovieData,
  addUserMovieData,
  isUserValid,
};
