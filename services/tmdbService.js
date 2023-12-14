const axios = require('axios');

const fetchMovieFromTmdb = async (movieId, TMDB_API_KEY) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
    return response.data;
};

module.exports = {
    fetchMovieFromTmdb
}