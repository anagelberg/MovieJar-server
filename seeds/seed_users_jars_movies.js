/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const userData = require("../seed_data/users.js");
const movieData = require("../seed_data/movies.js");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("movies").del();
    })
    .then(() => {
      return knex("movies").insert(movieData);
    });
};
