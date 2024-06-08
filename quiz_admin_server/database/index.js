const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "quiz",
  // password: "Anhem12!",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = connection;
