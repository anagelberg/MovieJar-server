const router = require("express").Router();

const jarController = require("../controllers/jarController");
const movieController = require("../controllers/movieController");
const { isAuthenticated, isRequestingOwnResource } = require("../middlewares/authMiddleware");


router.route("/").post(jarController.createJar);

/* complicated endpoint -- include user details too? */
router.route("/:jarid").get(jarController.jarDetails);

router.route("/:jarid/:userid")
    .delete(isAuthenticated, isRequestingOwnResource, jarController.removeUser);

router
    .route("/:jarid/movie/:movieid")
    .post(movieController.addMovieToJar)
    .delete(movieController.removeMovieFromJar);

module.exports = router;
