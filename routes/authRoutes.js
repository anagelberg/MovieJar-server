const router = require("express").Router();
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();
require('../passport-setup');
const { isAuthenticated } = require("../middlewares/authMiddleware");


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});

router.get('/protected', isAuthenticated, (req, res) => {
    //works
    res.json({ message: 'This is a protected route, and you are authenticated!' });
    console.log(req.user); //user object :) 
    console.log('user id received!', req.user.id)
});


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication
    console.log("Successfully logged in");
    res.redirect(process.env.CORS_ORIGIN);

});

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            // Handle the error if there is one
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.redirect(process.env.CORS_ORIGIN);
    });
})


module.exports = router;