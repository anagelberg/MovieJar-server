const knex = require("knex")(require("../knexfile"));

const createJar = (req, res) => {
  res.send("this will create a new jar");
};

const removeUser = (req, res) => {
  res.send(
    "This will remove a user from a jar. If the user is the only user, it will delete the jar"
  );
};

const jarDetails = (req, res) => {
    res.send(
      "This will return details for a given jar, including the list of movies associated with it"
    );
  };

module.exports = {
  createJar,
  removeUser,
  jarDetails
};
