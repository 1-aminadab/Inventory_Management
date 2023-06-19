const router = require("express").Router()
const db  = require("../db")
const session = require('express-session')

const {io} = require('../app')
console.log(io);
let studentData = null
module.exports.studentData = studentData

console.log(studentData);
router.post('/check_user', async(req, res)=>{
    const {uid, mac_address,place} = req.body
    
    try {
        db.query('SELECT fullName, email,userID, department FROM users WHERE userID = ?', userID, (error, result, fields)=>{
            if(result.length > 0 ){
                db.query('INSERT TO checkMac SET ?',)
                res.status(200).json({success:true,message:"User Exist", userData:result[0]})
                req.session.data = {userID:result[0].userID}
            }
            else{
                res.status(200).json({success:false,message:"User No Registerd"})
            }
        })
       
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"faild"})
    }
    
})














router.post('/check_socket', async(req, res)=>{

    console.log(req.body);
    console.log('there is something');
    io.emit('', `${req.body.uid}`)
})

router.post('/uid_file', async(req, res)=>{
    const itemID = req.body.uid
    db.query("SELECT * FROM items WHERE itemID = ?",itemID,(error, result, fields)=>{
        if(error) throw error;
        const itemData = result[0]
        
        if(result.length === 0){
            
            console.log("There is no item with this id");
        }else{
             console.log("Start to Investigate Eligibility");
            db.query("SELECT * FROM orders WHERE productID = ?", itemID, (error, result, fields)=>{
                if(error) throw error
               
                console.log(result[0]);
            })
           
        }
    })
    
    // db.end((error)=>{
    //     if(error){
    //         console.log("MySQL is not close successfully");
    //         return
    //     }
    //     console.log("MySQL closed successfully");
    // })
})

router.get('/check_eligibility',async(req, res)=>{
 const {userID, itemId} = req.body
})

module.exports = router