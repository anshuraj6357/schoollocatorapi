const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Render MySQL host
  user: process.env.DB_USER,        // Render MySQL username
  password: process.env.DB_PASSWORD,// Render MySQL password
  database: process.env.DB_NAME,    // Render MySQL database
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log('MySQL Pool connected ✅'))
  .catch(err => console.error('MySQL connection failed ❌', err));

module.exports = pool;
