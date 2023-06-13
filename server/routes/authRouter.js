const router = require('express').Router()
const db = require('../db')


router.post('/login', async(req,res)=>{
    const {userID, password} = req.body

    if(!userID || !password) return res.status(400).json({message:"Username and password are required"});

    const  userExist =  db.query('SELECT * FROM users WHERE userID = ?', userID, (error, result, fields)=>{
        if(error) throw error
        
        if(result.length === 0) return false;
        else return true;
    })
   
    console.log(userExist);

    
})

module.exports = router