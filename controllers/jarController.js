const knex = require("knex")(require("../knexfile"));

const userController = require("./userController");


/* Creates a jar */
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
        knex("jar_user_join").select('*').where({ jar_id: req.params.jarid }).then(data => {
          data.length > 0
            ? res.send("Item removed from user profile") //TODO: check once multiple users
            : knex("jar").where({ id: req.params.jarid }).del().then(() => {
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



// Return details for a given jar, including the list of movies (and details) associated with it and the users contributing 
const jarDetails = async (req, res) => {

  const jarInfo = await knex("jar")
    .where({ id: req.params.jarid });

  if (jarInfo.length === 0) {
    res.status(404).send("Jar not found");
  } else {
    //Note of future bug: to keep more simple the user data will be the creator of the jar. If more users exist later, come back and change this to be the current user's info instead. 
    const userInfo = await knex("jar_user_join")
      .select("user_id", "name")
      .where({ jar_id: req.params.jarid })
      .join("user", "user.id", "=", "jar_user_join.user_id");

    const movieInfo = await knex("jar_movie_join")
      .select("movie.id", "title", "poster_url", "description", "movie.rating as public_rating", "um.rating as user_rating", "year", "run_time", "genres", "mental_vibe", "emotional_vibe", "watched")
      .where({ jar_id: req.params.jarid })
      .join("movie", "movie.id", "jar_movie_join.movie_id")
      .join(
        knex("user_movie").where({ user_id: jarInfo[0].creator_id }).as("um"),
        "um.movie_id",
        "jar_movie_join.movie_id"
      );

    const resData = {
      id: jarInfo[0].id,
      name: jarInfo[0].name,
      creatorId: jarInfo[0].creator_id,
      allUsers: userInfo,
      movies: movieInfo
    }
    res.send(resData);
  }

};

module.exports = {
  createJar,
  removeUser,
  jarDetails,
};
