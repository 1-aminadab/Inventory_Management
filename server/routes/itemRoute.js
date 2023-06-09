const router = require("express").Router()
const db = require("../db")

router.get('/all_items',async(req, res)=>{
    db.query('SELECT * FROM items',(error, results, fields)=>{
        if(error) throw error;
        console.log(results);
    })
    db.end((error)=>{
        if(error){
            console.log('Error colosing MYSQL connection ' + error.stack);
            return 
        }
        console.log('Close MySQL connection');
        
    })
} )

router.post('/add_new_item',async(req, res)=>{
    db.query('INSERT INTO items SET ?', req.body,(error, results, fields)=>{
        if(error) throw error;
        console.log('result :', results)
        console.log('fields: ', fields);
        console.log('NEW RECORD ADDED TO ATHE TABLE WITH: ');
    })
    db.end((error)=>{
        if(error){
            console.log("Error closing MYsql connection : "+error.stack);
            return 
        }
        console.log('Closed MySQL connection')
    })
})

router.post('/update_item', async(req, res)=>{
    const rowIdToUpdate = req.body.id
    const updatedData = req.body.updatedData
    db.query('UPDATE items SET ? WHERE itemID = ?',[updatedData, rowIdToUpdate], (error, results, fields)=>{
        if(error) throw error;
        console.log('Row updated: ', results);
    })
    db.end((error)=>{
        if(error){
            console.error('Error closing MYSQL connection: ' + error.stack);
            return;
        }
        console.log('Closed MySQL connetion'); 
    })
})

router.delete('/delete_item',(req, res)=>{
    const rowIdToDelete = req.body.id
    db.query('DELETE FROM items WHERE itemID = ?', rowIdToDelete, (error, results, fields)=>{
        if(error) throw error;ላጤ
        console.log('Row delete: ', results.affectedRows);
    })

    db.end((error)=>{
        if(error){
            condole.error("Error closing MySQL connection: " + error.stack)
            return;
        }
        console.log('Closing MySQL connection Successfull ')
    })

})

module.exports = router