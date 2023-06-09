const mysql = require('mysql')

 const pool = mysql.createPool({
    connectionLimit : 10,
    host:'localhost',
    user: 'root',
    password:null,
    database:'inventoryDatabase'
  })

  module.exports = pool
