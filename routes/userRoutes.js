const router = require("express").Router();

const userController = require("../controllers/userController");

const { isAuthenticated } = require("../middlewares/authMiddleware");
const { movieInDb } = require("../middlewares/resourceExistenceMiddleware");

router
  .route("/jar")
  .get(isAuthenticated, userController.getOwnJars);

router
  .route("/movie/:movieid")
  .put(isAuthenticated, movieInDb, userController.editUserMovieData)
  .post(isAuthenticated, movieInDb, userController.addUserMovieData);

module.exports = router;
