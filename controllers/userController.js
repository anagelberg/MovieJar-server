const knex = require("knex")(require("../knexfile"));

const validUser = (userId) => {
  // expand logic later to accomodate more users.
  return userId === 1;
};

const getJars = (req, res) => {
  const userId = Number(req.params.userid);
  if (validUser(userId)) {
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
