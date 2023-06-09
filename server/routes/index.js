var express = require('express');
var router = express.Router();
var pool = require("../db")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/addUser', async(req, res)=>{
  const newUser = {firstName:"Amanuel",lastName:'Tadesse', password:"12345678" }
  await pool.query("INSERT INTO user (firstName, lastName, password) VALUE ('Abrham','Zewdu','12345678')",(err, result)=>{
    if(err) throw err
    console.log('Row has been updated');
    
    res.render('user',{result:result})
    
  })
  //res.redirect('/user')
})

  
})

module.exports = router;
