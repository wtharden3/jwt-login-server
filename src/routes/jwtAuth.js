const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');


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
   //res.json(newUser.rows[0]);
   // 5. generate jwt token
   const token = jwtGenerator(newUser.rows[0].user_id)
   res.status(200).json({
     message: `User ${newUser.rows[0].user_name} created!`,
     user: newUser.rows[0],
     token: token
     })
    
  } catch (err) {
    console.error(`[ERROR]: ${err.message}`);
    res.status(500).send(`[SEVER] Error at Registration!`)
  }
})

// login route
router.post('/login', async (req, res) => {
  try {
    // 1. desstructure req.body
    const {email, password} = req.body;

    // 2. does email exists?
    const loginUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if(loginUser.rows.length === 0){
     // 401 Unauthenticated - lacks valid authentication credentials for the requested resource
     // 403 Forbidden/Unauthorized - the server understands the request but refuses to authorize it
     return res.status(401).json(`[SERVER] Username and/or password is incorrect. Do you need to create an account?`);
   }
   const validPassword = await bcrypt.compare(password, loginUser.rows[0].user_password);
   if(validPassword){
     
     return res.status(200).json({
       message: `Welcome, ${loginUser.rows[0].user_name}!`,
       user: loginUser.rows[0],
       token: jwtGenerator(loginUser.rows[0].user_id)
      });
   }
    // res.json(loginUser.rows[0]);

    // 3. does password for existing email match the bcrypted password in the db
  } catch (err) {
    console.error(`[SERVER ERROR 🔥]: ${err.message}`);
    res.status(500).send(`[SEVER] Error at Login!`)
  }
})

module.exports = router;