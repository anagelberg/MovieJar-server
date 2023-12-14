// Description: This file contains the middlewares for checking if a resource exists in the database.
const movieService = require("../services/movieService.js");
const tmdbService = require("../services/tmdbService.js");
const jarService = require("../services/jarService.js");

const isJarExists = async (req, res, next) => {
    try {
        const jar = await jarService.getJar(req.params.jarid)

        if (jar.length === 0) {
            return res.status(404).json({ message: "Jar id not found in database" });
        }
        req.jar = jar[0];
        return next();
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// Checks if the movie is in db. If it isn't, add the movie. Sends error if unable to resolve. 
const movieInDb = async (req, res, next) => {
    req.movie = req.params.movieid;

    try {
        const moviesInDb = await movieService.getMovieData(req.movie);

        if (moviesInDb.length > 0) {
            return next();
        }

        const tmdbData = await tmdbService.fetchMovieFromTmdb(req.movie, process.env.TMDB_API_KEY);
        const newMovie = movieService.formatMovieForDb(tmdbData, req.movie);

        try {
            await movieService.addMovieData(newMovie);
            return next();
        } catch (err) {
            console.error("Error adding movie to database:", err);
            return res.status(500).send({ "message": "Error adding movie to database" });

        }
    } catch (err) {
        console.error("Error processing request:", err);
        return res.status(404).send({ "message": "Movie not found or TMDB API issue" });
    }
};



module.exports = {
    isJarExists,
    movieInDb
};