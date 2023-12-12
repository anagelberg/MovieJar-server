// const router = require("express").Router();
// const passport = require('passport');
// const session = require('express-session');
// require("dotenv").config();
// require('../passport-setup');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User not Authenticated. Please log in.' });
}

const isRequestingOwnResource = (req, res, next) => {
    if (req.user.id === req.params.userid) {
        return next();
    }
    res.status(403).json({ message: 'Not Authorized. User param id and authentication mismatch.' });
}

const isJarContributor = (req, res, next) => {
    // check if user is contributing to the requested jar
    return next()
}

module.exports = {
    isAuthenticated,
    isRequestingOwnResource,
    isJarContributor,
};