const knex = require("knex")(require("../knexfile"));;

const getMovieFromDb = async (movieId) => {
    return await knex("movie").where({ id: movieId });
};

const addMovieToDb = async (newMovie) => {
    return await knex("movie").insert(newMovie);
};

const formatMovieForDb = (tmdbData, movieId) => {
    return {
        id: movieId,
        title: tmdbData.original_title,
        poster_url: `https://image.tmdb.org/t/p/original${tmdbData.poster_path}`,
        description: tmdbData.overview,
        rating: (tmdbData.vote_average) / 2,
        year: Number(tmdbData.release_date.split("-")[0]),
        run_time: tmdbData.runtime,
        genres: tmdbData.genres.map(genre => genre.name).join(", "),
        imdb_id: tmdbData.imdb_id
    };
}

module.exports = {
    getMovieFromDb,
    addMovieToDb,
    formatMovieForDb
}