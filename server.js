/* Dependencies */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("express").Router();
const passport = require('passport');
const session = require('express-session');
require('./passport-setup');

const jarRoutes = require("./routes/jarRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

//env
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// app
const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.static("public"));


// Passport auth
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


/* Routes */
app.use("/jar", jarRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

/* Home page API */
app.get("/", (req, res) => {
  res.send("You've reached the server");
});

app.listen(PORT, () => {
  console.log(`listening on ${BACKEND_URL}:${PORT}`);
});

