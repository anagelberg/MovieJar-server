const moviesInJarService = require("../services/moviesInJarService");

// Add a movie to a jar if not already present.
const addMovieToJar = async (req, res) => {
  try {
    const isMovieInJar = await moviesInJarService.isMovieInJar(req.params.movieid, req.params.jarid)
    !isMovieInJar && await moviesInJarService.addMovieToJar(req.params.movieid, req.params.jarid, req.user.id)
    return res.status(200).send("Movie added to jar or already exists.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected Server Error Occurred");
  }

}

/* Remove a movie from jar */
const removeMovieFromJar = async (req, res) => {

  try {
    const numDel = await moviesInJarService.removeMovieFromJar(req.params.movieid, req.params.jarid);
    numDel > 0
      ? res.send("Movie deleted from jar")
      : res.status(204).send("Nothing to delete")

  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected Server Error Occurred");
  }

};


/* Exports */
module.exports = {
  addMovieToJar,
  removeMovieFromJar,
};
