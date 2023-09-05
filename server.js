/* Dependencies */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jarRoutes = require("./routes/jarRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

//env
const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

// app
const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public"));

/* Routes */
app.use("/jar", jarRoutes);
app.use("/user", userRoutes);

/* Home page API */
app.get("/", (req, res) => {
  res.send("You've reached the server");
});

app.listen(PORT, () => {
  console.log(`listening on ${BACKEND_URL}:${PORT}`);
});

