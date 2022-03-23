const jwt = require('jsonwebtoken');
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
      id: user_id
  }
  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60}) // 60 * 60 = 3600 seconds in an hour
}

module.exports = jwtGenerator;