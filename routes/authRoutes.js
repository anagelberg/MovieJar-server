const router = require("express").Router();
const passport = require('passport');
const cors = require("cors");
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
    req.session.save(err => {
        if (err) {
            console.log("Error saving session: ", err)
            return;
        }
        res.redirect(process.env.FRONTEND_URL);
    });
});


router.get('/logout', cors({ origin: process.env.FRONTEND_URL, credentials: true }), (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error on logout');
        }
        res.clearCookie('connect.sid');
        res.status(200).send('Logged out');
    });
});

module.exports = router;