const router = require("express").Router()
const db  = require("../db")


router.get('/check_socket', async(req, res)=>{
    console.log(req.body.content);
    try {
        res.status(200).json("success")
    } catch (error) {
        res.status(400).json("unsuccess")
    }

    // req.io.on('connection', (socket) => {
    //     console.log('A user connected');
    //     socket.on('chat message', (msg) => {
    //       console.log(`Received message: ${msg}`);
    //       req.io.emit('chat message', msg);
    //     });
    //   });

})

router.post('/uid_file', async(req, res)=>{
    const uidFile = req.body
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

})

module.exports = router