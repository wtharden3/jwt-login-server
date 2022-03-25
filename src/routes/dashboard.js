const pool = require('../../db');
const router = require('express').Router();
const authorize = require('../middlewares/authorize');



router.get('/', authorize, async (req, res) => {
  try { 
    // res.send('HELLO:', req.headers);
    // res.json({id: req.user});
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [req.user]);
    res.json({user: user});
  } catch (err) {
    console.error(`[❗️ SERVER ERROR in Dashboard ❗️]: ${err.message}`);
    return res.status(500).json(
      {
        message: `[SEVER] Error at Dashboard!`
      }
    )
    
  }
})

module.exports = router;