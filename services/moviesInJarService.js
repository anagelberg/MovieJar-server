const knex = require("knex")(require("../knexfile"));;

const isMovieInJar = async (movieId, jarId) => {
    const moviesInJar = await knex("jar_movie_join")
        .select("*")
        .where({ movie_id: movieId, jar_id: jarId });
    return moviesInJar.length > 0;
}

const addMovieToJar = async (movieId, jarId) => {
    return await knex("jar_movie_join").insert({ movie_id: movieId, jar_id: jarId });
}

const removeMovieFromJar = async (movieId, jarId) => {
    return await knex("jar_movie_join")
        .where({ movie_id: movieId, jar_id: jarId })
        .del();

}

module.exports = { isMovieInJar, addMovieToJar, removeMovieFromJar };