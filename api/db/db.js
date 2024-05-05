const mysql = require('mysql2');


var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "subscription_management_system"
  }).promise()

  module.exports = pool