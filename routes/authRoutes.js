const router = require("express").Router();
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();


require('../passport-setup');


// Setup for sessions
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication
    console.log("Successfully logged in");
    res.redirect('/'); // Redirect to the frontend webpage

});




module.exports = router;