const router = require("express").Router()
const db = require("../db")

router.post('/send_request', async(req, res)=>{
    const newOrder = req.body
    db.query('INSERT INTO orders SET ?',req.body, (error, result, fields)=>{
        if(error) throw error
        console.log("order successfully added:", result);
    })
    db.end((error)=>{
        if(error){
            console.log("Mysql not closed correctely");
            return
        }
        console.log("mysql Closed Successfully");
    })
})

router.patch('/send_approval', async(req, res)=>{
    const orderID = req.body.id
    const approved = {approved:true}
    
    db.query("UPDATE orders SET ? WHERE orderID = ?", [approved, orderID],(error, result, fields)=>{
        if(error) throw error;
        console.log("Approved Succesfully");

    })
    db.end((error)=>{
        if(error){
            console.log("MYsql not closed");
            return
        }
        console.log("MYSQL CLOSED SUCCESSFULLY");
    })
})
router.patch('/send_rejection', async(req, res)=>{
    const orderID = req.body.id
    const rejected = {approved:false, rejected:true,reason:req.body.reason}

    db.query("UPDATE orders SET ? WHERE orderID = ?", [rejected, orderID],(error, result, fields)=>{
        if(error) throw error;
        console.log("Rejected Succesfully");

    })
    db.end((error)=>{
        if(error){
            console.log("MYsql not closed");
            return
        }
        console.log("MYSQL CLOSED SUCCESSFULLY");
    })
})
router.patch('/send_taken', async(req, res)=>{
    const orderID = req.body.id
    const taken = {taken:true}

    db.query("UPDATE orders SET ? WHERE orderID = ?", [taken, orderID],(error, result, fields)=>{
        if(error) throw error;
        console.log("Rejected Succesfully");

    })
    db.end((error)=>{
        if(error){
            console.log("MYsql not closed");
            return
        }
        console.log("MYSQL CLOSED SUCCESSFULLY");
    })


})
router.patch('/send_confirmation', async(req, res)=>{
    const orderID = req.body.id
    const confirmation = {confirmed:true}
    db.query('UPDATE orders SET ? WHERE orderID=?',[confirmation,orderID],(error, result, fields)=>{
        if(error) throw error;
        console.log("Confirmation Sent Successfully: ", result);
    })
    db.end((error)=>{
        if(error){
            console.log("Mysql closing Failed");
            return
        }
        console.log("MySQL Successfully closed");
    })
})
router.delete('/delete_request', async(req, res)=>{
    const orderID = req.body.id
    db.query("DELETE FROM orders WHERE orderID = ?",orderID, (error, result, fields)=>{
        if(error) throw error
        console.log('Order deleted successfully:',result);

    })
    db.end((error)=>{
        if(error){
            console.log("MySQL is not closed");
            return 
        }
        console.log('MySQL closed successfully');
    })
})

module.exports = router