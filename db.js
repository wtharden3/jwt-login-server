const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: "TyLTyL!378",
  host: "localhost",
  port: 5433,
  database: "jwtlogindb"
});

module.exports = pool;