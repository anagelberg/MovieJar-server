const router = require("express").Router();

const userController = require("../controllers/userController");
const { isAuthenticated, isRequestingOwnResource } = require("../middlewares/authMiddleware");

router
  .route("/jar")
  .get(isAuthenticated, userController.getOwnJars);

router
  .route("/:userid/movie/:movieid")
  .put(isAuthenticated, isRequestingOwnResource, userController.editUserMovieData)
  .post(isAuthenticated, isRequestingOwnResource, userController.addUserMovieData);

module.exports = router;
