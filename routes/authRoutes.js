const router = require("express").Router();
const passport = require('passport');
require("dotenv").config();
require('../passport-setup');

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

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log("Made it to /google/callback");

    // Set a test cookie
    res.cookie('TestCookie', 'testValue', {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
        sameSite: 'None', // Necessary for cross-domain cookies
        domain: process.env.NODE_ENV === 'production' ? '.moviejar.ca' : undefined
    });

    console.log("Test cookie set");
    console.log("session", req.session);
    console.log("Redirecting to", process.env.FRONTEND_URL);
    res.redirect(process.env.FRONTEND_URL);
});

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.redirect(process.env.FRONTEND_URL);
    });
})


module.exports = router;