var express = require('express');
var router = express.Router();
var pool = require("../db")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is the last stand")
  res.render('index', { title: 'Express' });
  
});

router.post('/uid_check', async(req, res)=>{
 console.log("request send");
 res.send(req.body);
 console.log(req.body);
 try {
  res.status(200).json({message:true})
 } catch (error) {
  res.status(404).json({message:false})
 }

})
module.exports = router;
