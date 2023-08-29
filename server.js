const express = require("express");
const cors = require("cors");
require("dotenv").config();

//env
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// app
const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("You've reached the server");
});

app.listen(PORT, () => {
  console.log(`listening on ${BACKEND_URL}:${PORT}`);
});
