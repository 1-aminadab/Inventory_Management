const router = require("express").Router()
const db = require("../db")

// Cruds for users
router.get('/all_users',async(req, res)=>{
    db.query('SELECT * FROM users',(error, results, fields)=>{
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

router.post('/add_new_user',async(req, res)=>{
    
    db.query('INSERT INTO users SET ?', req.body,(error, results, fields)=>{
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

router.patch('/update_user', async(req, res)=>{
    const rowIdToUpdate = req.body.id
    const updatedData = req.body.updatedData
    db.query('UPDATE users SET ? WHERE userID = ?',[updatedData, rowIdToUpdate], (error, results, fields)=>{
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

router.delete('/delete_user',(req, res)=>{
    const rowIdToDelete = req.body.id
    db.query('DELETE FROM users WHERE userID = ?', rowIdToDelete, (error, results, fields)=>{
        if(error) throw error;
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