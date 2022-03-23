const pool = require('../../db');
const bcrypt = require('bcrypt');

const router = require('express').Router();

//register
router.post('/register', async (req,res) => {
  try {
    // 1. destructure req.body (name, email, password)
   const {name, email, password} = req.body;
   // 2. check if user exists
   const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email] )
   if(user.rows.length !== 0){
     // 401 Unauthenticated - lacks valid authentication credentials for the requested resource
     // 403 Forbidden/Unauthorized - the server understands the request but refuses to authorize it
     return res.status(401).send(`[SERVER] this user already exists`);
   }
   // 3. bcrypt user's password
   const saltRound = 10;
   const salt = await bcrypt.genSalt(saltRound);
   const bcryptPassword = await bcrypt.hash(password, salt);

   // 4. enter new user inside database
   const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING * ", [name, email, bcryptPassword]);
   res.json(newUser.rows[0]);
    
  } catch (err) {
    console.error(`[ERROR]: ${err.message}`);
    res.status(500).send(`[SEVER] Error at Registration!`)
  }
})

module.exports = router;