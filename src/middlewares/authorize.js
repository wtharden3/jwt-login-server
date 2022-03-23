const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next) => {
  try {
    const jwToken = req.header('token');
    if(!jwToken){
      return res.status(403).json({
        message: 'you are not authorized'
      })
    }
    const payload = jwt.verify(jwToken, process.env.jwtSecret);
    req.user = payload.user;
  } catch (err) {
    console.error(`[❗️ SERVER ERROR ❗️]: ${err.message}`);
    return res.status(403).json({
      message: `[SEVER] You are not authorized!`
    })
  }
  next();
}