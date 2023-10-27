const router = require("express").Router();
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();


require('../passport-setup');


// middleware 

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not Authorized' });
    // Or redirect them to the login page: res.redirect('/login');
}




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


router.get('/protected', isAuthenticated, (req, res) => {
    //works
    res.json({ message: 'This is a protected route, and you are authenticated!' });
    console.log(req.user); //user object :) 
    console.log('user id received!', req.user.id)
});


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Successful authentication
    console.log("Successfully logged in");
    res.redirect('http://localhost:3000/'); // Redirect to the frontend webpage

});




module.exports = router;