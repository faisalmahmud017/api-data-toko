const mysql = require('mysql');
require('dotenv').config();

DbHost = process.env.DB_HOST;
DbUser = process.env.DB_USER;
DbPassword = process.env.DB_PASSWORD;
DbName = process.env.DB_NAME;

const Connection = mysql.createConnection({
    host: DbHost,
    user: DbUser,
    password: DbPassword,
    database: DbName,
})

module.exports = Connection;