const router = require("express").Router();
const jarController = require("../controllers/jarController");
const movieController = require("../controllers/movieController");


const { isAuthenticated, isRequestingOwnResource, isJarContributor } = require("../middlewares/authMiddleware");
const { isJarExists } = require("../middlewares/resourceExistenceMiddleware");


router.route("/")
    .post(jarController.createJar);

router.route("/:jarid")
    .get(isJarExists,
        jarController.jarDetails);

router.route("/:jarid/:userid")
    .delete(
        isAuthenticated,
        isRequestingOwnResource,
        jarController.removeUser);

router.route("/:jarid/movie/:movieid")
    .post(
        isAuthenticated,
        isJarExists,
        isJarContributor,
        movieController.addMovieToJar)
    .delete(
        isAuthenticated,
        isJarExists,
        isJarContributor,
        movieController.removeMovieFromJar);

module.exports = router;
