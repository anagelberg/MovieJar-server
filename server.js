/* Dependencies */
const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const enforce = require('express-sslify');
require('./passport-setup');
require("dotenv").config();

const jarRoutes = require("./routes/jarRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const PORT = process.env.PORT || 8080;

// app
const app = express();


// Middleware

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set to true if using https
    sameSite: process.env.NODE_ENV === "production" ? 'None' : 'Lax',
    maxAge: process.env.NODE_ENV === "production" ? Infinity : 24 * 60 * 60 * 1000,
    path: '/',
    domain: process.env.NODE_ENV === "production" ? 'moviejar.ca' : undefined
  }
}));

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/jar", jarRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Enforce HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

/* Home page API */
app.get("/", (req, res) => {
  res.send(`You've reached the ${process.env.NODE_ENV} server`);
});

app.listen(PORT, () => {
  console.log(`listening on ${process.env.BACKEND_URL}`);
});

