const router = require("express").Router();

const userController = require("../controllers/userController");

router.route("/:userid/jar").get(userController.getJars);
router
  .route("/:userid/movie/:movieid")
  .put(userController.editUserMovieData)
  .post(userController.addUserMovieData);

module.exports = router;
