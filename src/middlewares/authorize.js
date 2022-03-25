const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next) => {
  const token = req.header('token');
  if(!token){
    return res.status(403).json({
      message: 'you are not authorized'
    })
  }
  // verify token
  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    console.error(`[❗️ SERVER ERROR ❗️]: ${err.message}`);
    return res.status(403).json({
      message: `[SEVER] You are not authorized!`
    })
  }
}