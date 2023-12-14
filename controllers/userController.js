const userMovieService = require("../services/userMovieService");
const jarService = require("../services/jarService");

const getOwnJars = async (req, res) => {

  try {
    const data = await jarService.getJarsByUserId(req.user.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error")
  }

};


const editUserMovieData = async (req, res) => {

  const dataExists = await userMovieService.isUserMovieData(userId, movieId);

  if (!dataExists) {
    return res.status(400).send("Data on user/movie doesn't exist. Use a post request to create instead.");
  }

  const newUserMovieData = {
    movie_id: Number(req.movie),
    user_id: Number(req.user.id),
    ...req.body,
  };

  try {
    await userMovieService.editUserMovieInDb(newUserMovieData)
    res.status(200).send("Successfully updated user data");
  } catch (err) {
    console.log(err);
    res.status(400).send("Check input format");
  }

};

const addUserMovieData = async (req, res) => {
  const dataExists = await userMovieService.isUserMovieData(req.user.id, req.movie);
  const newUserMovieData = {
    movie_id: Number(req.movie),
    user_id: Number(req.user.id),
    ...req.body,
  };

  if (dataExists) { //overwrite it
    try {
      await userMovieService.editUserMovieInDb(newUserMovieData)
      res.status(200).send("Successfully updated user data");
    } catch (err) {
      console.log(err)
      res.status(500).send("Internal Server Error Adding Movie")
    }
  } else {// Add the data to Db
    try {
      await userMovieService.addUserMovieToDb(newUserMovieData);
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
