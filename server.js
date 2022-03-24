const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
require("dotenv").config();

//middleware
app.use(express.json()); // for req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use('/auth', require('./src/routes/jwtAuth'));

//dashboard routes
app.use('/dashboard', require('./src/routes/dashboard'));



app.listen(process.env.PORT, () => {
  console.log(`[SERVER] You are listening on port ${process.env.PORT}`);
  // create database if does not exist
  // add extension if not exist
  // create user table if not exist
});