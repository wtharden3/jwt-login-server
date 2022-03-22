const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json()); // for req.body
app.use(cors());

//routes


app.listen(4848, () => {
  console.log(`[SERVER] You are listening on port 4848`);
});