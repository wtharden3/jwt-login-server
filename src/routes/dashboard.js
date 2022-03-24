const router = require('express').Router();
const pool = require('../../db');
const authorize = require('../middlewares/authorize');


router.get('/', authorize, async (req, res) => {
  try {
    res.json({message: 'user should be below', user: req.user})
    
  } catch (err) {
    console.error(`[❗️ SERVER ERROR ❗️]: ${err.message}`);
    return res.status(500).json(
      {
        message: `[SEVER] Error at Dashboard!`
      }
    )
    
  }
})

module.exports = router;