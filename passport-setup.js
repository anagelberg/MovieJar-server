const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();
const knex = require("knex")(require("./knexfile"));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    knex('user').where({ id: id }).first()
        .then(user => {
            done(null, user);
        })
        .catch(err => done(err));

});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    }, (accessToken, refreshToken, profile, done) => {
        knex('user').where({ google_id: profile.id }).first()
            .then(existingUser => {
                if (existingUser) {
                    done(null, existingUser.id);
                } else {
                    knex('user').insert({
                        google_id: profile.id,
                        google_photo: profile.photos[0]?.value,
                        name: profile.displayName,
                        email: profile.emails[0]?.value
                    })
                        .then(user => {
                            done(null, user[0]);
                        });
                }
            })
            .catch(err => done(err));


    })
);
