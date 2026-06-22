const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'arem_db',
  password: '111',
  port: 5433,
});

module.exports = pool;