const router = require("express").Router()
const db = require("../db")
const multer = require('multer')
// /////////////

// multer 
var userProfileImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/item_profile')
    },
    filename:function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter:(req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== (".png" || ".jpg" || ".jpeg")){
            return cb(res.status(400).end(`unsuported file`, false))
        }
        cb(null, true)
    }
})  

var uploadUserProfile = multer({storage: userProfileImage}).single('userProfile')

router.post("/uploadProfileImage",(req, res)=>{
    console.log(req.body);
    uploadUserProfile(req, res, err => {
        if (err){
            console.log(err);
            return res.json({success: false, msg:"Profile Image not Successfully uploaded"})
        }
      
        return res.json({filePath: res.req.file.path, fileName: res.req.file.filename})
   })

})



router.get('/all_items',async(req, res)=>{
    db.query('SELECT * FROM items',(error, result, fields)=>{
        if(error) throw error;
        res.status(200).json({success: true, itemData: result})
    })
    // db.end((error)=>{
    //     if(error){
    //         console.log('Error colosing MYSQL connection ' + error.stack);
    //         return 
    //     }
    //     console.log('Close MySQL connection');
        
    // })
} )
router.post('/one_item', async(req, res)=>{
    const {itemID} = req.body
    db.query('SELECT * FROM items where itemID = ?',itemID, (error, result, fields)=>{
        if(error) throw error;
        res.status(200).json({success: true, itemData:result})
    })
})
router.post('/register',async(req, res)=>{
    const itemData = req.body
    console.log(itemData);
    db.query('INSERT INTO items SET ?', {...itemData,remainingQuantity:req.body.totalQuantity},(error, results, fields)=>{
        if(error) throw error;
        console.log('result :', results)
        console.log('fields: ', fields);
        console.log('NEW RECORD ADDED TO ATHE TABLE WITH: ');
    })
    // db.end((error)=>{
    //     if(error){
    //         console.log("Error closing MYsql connection : "+error.stack);
    //         return 
    //     }
    //     console.log('Closed MySQL connection')
    // })
})

router.post('/update_item', async(req, res)=>{
    const rowIdToUpdate = req.body.id
    const updatedData = req.body.updatedData
    db.query('UPDATE items SET ? WHERE itemID = ?',[updatedData, rowIdToUpdate], (error, results, fields)=>{
        if(error) throw error;
        console.log('Row updated: ', results);
    })
    // db.end((error)=>{
    //     if(error){
    //         console.error('Error closing MYSQL connection: ' + error.stack);
    //         return;
    //     }
    //     console.log('Closed MySQL connetion'); 
    // })
})

router.delete('/delete_item/:id',(req, res)=>{
    const {id}= req.params
    console.log(id);
    
    db.query('DELETE FROM items WHERE itemID = ?', id, (error, results, fields)=>{
        if(error) throw error;
        res.status(200).json({success:true, itemData:results})
        console.log('Row delete: ', results);
    })

    // db.end((error)=>{
    //     if(error){
    //         condole.error("Error closing MySQL connection: " + error.stack)
    //         return;
    //     }
    //     console.log('Closing MySQL connection Successfull ')
    // })

})

module.exports = router