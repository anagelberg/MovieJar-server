const knex = require("knex")(require("../knexfile"));

/* Creates a jar */
const createJar = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Invalid post body format. Expected 'name'.");
  }
  try {
    const result = await knex.transaction(async trx => {
      const data = await trx("jar").insert({
        creator_id: req.user.id,
        name: req.body.name,
      });

      await trx("jar_user_join").insert({
        jar_id: data[0],
        user_id: req.user.id,
      });

      return data[0];
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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

  //Note of future bug: to keep more simple the user data will be the creator of the jar. If more users exist later, come back and change this to be the current user's info instead or to default to creator's ratings. 

  const userInfo = await knex("jar_user_join")
    .select("user_id as userId", "name")
    .where({ jar_id: req.jar.id })
    .join("user", "user.id", "=", "jar_user_join.user_id");

  const movieInfo = await knex("jar_movie_join")
    .select("movie.id", "title", "poster_url as posterUrl", "description", "movie.rating as publicRating", "um.rating as userRating", "year", "run_time as runTime", "genres", "mental_vibe as mentalVibe", "emotional_vibe as emotionalVibe", "watched")
    .where({ jar_id: req.jar.id })
    .join("movie", "movie.id", "jar_movie_join.movie_id")
    .join(
      knex("user_movie").where({ user_id: req.jar.creator_id }).as("um"),
      "um.movie_id",
      "jar_movie_join.movie_id"
    );

  const resData = {
    id: req.jar.id,
    name: req.jar.name,
    creatorId: req.jar.creator_id,
    allUsers: userInfo,
    movies: movieInfo
  }
  res.send(resData);

};




module.exports = {
  createJar,
  removeUser,
  jarDetails,
};
