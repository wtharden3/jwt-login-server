const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(express.json()); // for req.body
app.use(cors());

//ROUTES//

//register and login routes
app.use('/auth', require('./src/routes/jwtAuth'));



app.listen(4848, () => {
  console.log(`[SERVER] You are listening on port 4848`);
});