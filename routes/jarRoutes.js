const router = require("express").Router();

const jarController = require("../controllers/jarController");
// const movieController = require("../controllers/movieController");

router.route("/").post(jarController.createJar);

/* complicated endpoint -- include user details too? */
router.route("/:jarid").get(jarController.jarDetails);

router.route("/:jarid/:userid").delete(jarController.removeUser);
// router.route("/:jarid/movie").post(movieController.addMovie);
// router.route("/:jarid/movie/:movieid").delete(movieController.removeMovie);

module.exports = router;
