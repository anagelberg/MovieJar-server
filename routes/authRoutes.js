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


    console.log("req.sessionID: ", req.sessionID);
    console.log("req.session: ", req.session);

    // // Manually set the session cookie
    // const sessionCookieName = 'connect.sid'; // Default name, adjust if you've changed it
    // const sessionCookieValue = req.sessionID;
    // const sessionCookieOptions = {
    //     maxAge: 24 * 60 * 60 * 1000, // Example: 24 hours
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'None',
    //     domain: process.env.NODE_ENV === 'production' ? '.moviejar.ca' : undefined
    // };

    // res.cookie(sessionCookieName, sessionCookieValue, sessionCookieOptions);

    // console.log("Session cookie manually set");

    req.session.save(err => {
        if (err) {
            console.log("Error saving session: ", err)
            return;
        }
        res.redirect(process.env.FRONTEND_URL);
    });


    // res.redirect(process.env.FRONTEND_URL);
});


router.get('/logout', (req, res) => {
    req.logout(function (err) {
        // if (err) {
        //     return next(err);
        // }
        res.clearCookie('connect.sid');
        res.redirect(process.env.FRONTEND_URL);
    });
})


module.exports = router;