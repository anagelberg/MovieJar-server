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