const knex = require("knex")(require("../knexfile"));;


const addUserMovieToDb = async (userData) => {
    return await knex("user_movie").insert(userData);
}

const editUserMovieInDb = async (userData) => {
    return await knex("user_movie")
        .where({ movie_id: userData.movie_id, user_id: userData.user_id })
        .update(userData);
}

const isUserMovieData = async (userId, movieId) => {
    const data = await knex("user_movie")
        .select("*")
        .where({ user_id: userId, movie_id: movieId });

    return data.length > 0;
};


module.exports = { addUserMovieToDb, editUserMovieInDb, isUserMovieData };
