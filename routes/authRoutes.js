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
    console.log("Checking the status... ");
    console.log("req.sessionID: ", req.sessionID);
    if (req.isAuthenticated()) {
        console.log("Result returned: Authenticated")
        res.json({ authenticated: true, user: req.user });
    } else {
        console.log("Result returned: Not authenticated")
        res.json({ authenticated: false });
    }
});

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log("Made it to /google/callback");


    console.log("req.sessionID: ", req.sessionID);
    console.log("req.session: ", req.session);

    req.session.save(err => {
        if (err) {
            console.log("Error saving session: ", err)
            return;
        }
        res.redirect(process.env.FRONTEND_URL);
    });


    // res.redirect(process.env.FRONTEND_URL);
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