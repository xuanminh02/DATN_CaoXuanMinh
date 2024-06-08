import mysql from "mysql2/promise"
import bluebird from "bluebird"

const connection= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "quiz",
    waitForConnections: true,
    connectionLimit: 100,
    connectTimeout: 10000,
    queueLimit: 0,
    Promise: bluebird
})

export default connection