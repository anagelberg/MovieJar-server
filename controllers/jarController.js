const knex = require("knex")(require("../knexfile"));

const userController = require("./userController");

const createJar = async (req, res) => {
  const creatorId = Number(req.body.creatorId);
  const validUser = await userController.isUserValid(creatorId);
  if (validUser && req.body.name) {
    knex("jar")
      .insert({
        creator_id: creatorId,
        name: req.body.name,
      })
      .then(() => {
        res.send("Successfully created a jar!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal server error");
      });
  } else {
    res.status(400).send("Invalid body format or invalid user (creator) id");
  }
};

// This removes a user from a Jar. If the user is the only user contributing to that jar, the jar is also deleted. 
const removeUser = (req, res) => {
  knex("jar_user_join")
    .select("*")
    .where({ jar_id: req.params.jarid, user_id: req.params.userid })
    .del()
    .then((numDel) => {
      if (numDel < 1) {
        res.status(400).send("Item not found. Nothing to delete.");
      } else {
        knex("jar_user_join").select('*').where({jar_id: req.params.jarid}).then(data=> {
          data.length > 0 
          ? res.send("Item removed from user profile") //TODO: check once multiple users
          : knex("jar").where({id: req.params.jarid}).del().then(() => {
            return res.send("Jar successfully deleted.")
          })

          })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
};

const jarDetails = (req, res) => {
  /* *********COMPLICATED CALL***************/
  res.send(
    "This will return details for a given jar, including the list of movies associated with it"
  );
};

module.exports = {
  createJar,
  removeUser,
  jarDetails,
};
