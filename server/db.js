const mysql = require('mysql')

 const pool = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:null,
    database:'inventoryDatabase'
  })

  module.exports = pool
