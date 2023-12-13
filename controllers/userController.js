const knex = require("knex")(require("../knexfile"));
const { addUserMovieToDb, editUserMovieInDb, isUserMovieData } = require("../utils/userMovieDbUtils");


/* Get all jars associated with the current user */
const getOwnJars = async (req, res) => {
  try {
    const data = await knex("jar_user_join")
      .select("jar_id as jarId", "name", "creator_id as creatorId")
      .where({ user_id: req.user.id })
      .join("jar", "jar.id", "=", "jar_user_join.jar_id")
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error")
  }

};

const editUserMovieData = async (req, res) => {
  const dataExists = await isUserMovieData(userId, movieId);

  if (!dataExists) {
    return res.status(400).send("Data on user/movie doesn't exist. Use a post request to create instead.");
  }

  const newUserMovieData = {
    movie_id: Number(req.movie),
    user_id: Number(req.user.id),
    ...req.body,
  };

  try {
    await editUserMovieInDb(newUserMovieData)
    res.status(200).send("Successfully updated user data");
  } catch (err) {
    console.log(err);
    res.status(400).send("Check input format");
  }

};

const addUserMovieData = async (req, res) => {
  const dataExists = await isUserMovieData(req.user.id, req.movie);
  const newUserMovieData = {
    movie_id: Number(req.movie),
    user_id: Number(req.user.id),
    ...req.body,
  };

  if (dataExists) { //overwrite it
    try {
      await editUserMovieInDb(newUserMovieData)
      res.status(200).send("Successfully updated user data");
    } catch (err) {
      console.log(err)
      res.status(500).send("Internal Server Error Adding Movie")
    }
  } else {// Add the data to Db
    try {
      await addUserMovieToDb(newUserMovieData);
      res.status(200).send("Successfully added user data");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error Adding Movie")
    }

  }

};

module.exports = {
  getOwnJars,
  editUserMovieData,
  addUserMovieData,
};
