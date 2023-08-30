/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const userData = require("../seed_data/user.js");
const movieData = require("../seed_data/movie.js");
const jarData = require("../seed_data/jar.js");
const jarMovieData = require("../seed_data/jarMovieJoin.js");
const jarUserData = require("../seed_data/jarUserJoin.js");
const userMovieData = require("../seed_data/userMovie.js");

exports.seed = function (knex) {
  return knex("jar_movie_join")
    .del()
    .then(() => {
      return knex("user_movie").del();
    })
    .then(() => {
      return knex("jar_user_join").del();
    })
    .then(() => {
      return knex("jar").del();
    })
    .then(() => {
      return knex("user").del();
    })
    .then(() => {
      return knex("movie").del();
    })
    .then(() => {
      return knex("movie").insert(movieData);
    })
    .then(() => {
      return knex("user").insert(userData);
    })
    .then(() => {
      return knex("jar").insert(jarData);
    })
    .then(() => {
      return knex("jar_movie_join").insert(jarMovieData);
    })
    .then(() => {
      return knex("jar_user_join").insert(jarUserData);
    })
    .then(() => {
      return knex("user_movie").insert(userMovieData);
    });
};
