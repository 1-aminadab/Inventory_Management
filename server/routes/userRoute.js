const router = require("express").Router()
const db = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
////// MULTER SETUP OF USER PROFILE
////////////////////////////////

const jwtSecret = 'mysecretkey'



// multer 
var userProfileImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/user_profile')
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
// Midleware to chec admin role

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decode = jwt.verify(token, jwtSecret);
        if(decode.role !== 'admin') {
            return res.status(403).send('Access denied')
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(401).send('Invalid token')
    }
};

// Midelware to check user role
const isUser = (req, res, next) =>{
    const token = req.header.authorization.split(' ')[1];
    try {
        const decode = req.verify(token, jwtSecret)
        if(decode.role !== 'user') {
            return res.status(403).send('Access denied')
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(401).send("Invalid token")
    }
}

// User registration endpoint
router.post('/register', async(req, res)=>{
    console.log("hellwo");
    console.log(req.body);
    let password = `${req.body.firstName}_${req.body.lastName}`.toUpperCase()
    let fullName =  `${req.body.firstName} ${req.body.lastName}`
    console.log(password);
    try {
       
        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = {...req.body, password:hashedPassword, fullName:fullName,imagePath:req.body.image}
        delete userData.firstName
        delete userData.lastName
        delete userData.image
        delete userData.userId
        console.log(userData);
        const query = 'INSERT INTO users SET ?'
        db.query(query, userData, (error, result, field)=>{
            
            if (error) {
                console.log(error);
                res.status(500).send('Server error')
            }else{
                console.log("User created");
                res.status(201).send("User create")
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
    }
})
router.get('/one_user/:id', async(req, res)=>{
    const {id} = req.params
    db.query('SELECT * FROM users where userID = ?',id, (error, result, fields)=>{
        if(error) throw error;
        res.status(200).json({success: true, userData:result})
    })
})
router.get('/all_users',async(req, res)=>{
    db.query('SELECT * FROM users',(error, result, fields)=>{
        if(error) throw error;
        res.status(200).json({success: true, userData: result})
    })
    
} )

router.post('/update_user', async(req, res)=>{
    const id = req.body.id
    const updatedData = req.body.updatedData
    const fullName = `${updatedData.firstName} ${updatedData.lastName}`
    delete updatedData.firstName
    delete updatedData.lastName
    db.query('UPDATE users SET ? WHERE userID = ?',[{...updatedData, fullName}, id], (error, results, fields)=>{
        if(error) throw error;
        console.log('Row updated: ', results);
    })
    // db.end((error)=>{

})
router.post('user/login', async(req, res)=>{
    try {
        const {userID, password} = req.body;
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [userID], async(error, results)=>{
            if(error) {
                console.error(error);
                res.status(500).send("Server error")
            } else if (results.length === 0) {
                res.status(401).send("Invalid credentials")
            }
            else{
                const user = results[0]
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch || user.role !== 'admin') {
                    res.status(401).send('Invalid credential');
                }else {
                    const token = jwt.sign({id: user.id, role:user.role},jwtSecret);
                    res.send({token})
                }
            }
        })
    } catch (error) {
        
    }

})
router.delete('/delete_user/:id',(req, res)=>{
    const {id}= req.params
    console.log(id);
    
    db.query('DELETE FROM users WHERE userID = ?', id, (error, results, fields)=>{
        if(error) throw error;
        res.status(200).json({success:true, userData:results})
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



// /////// login exprement
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
      const { userID, password } = req.body;
  
      // validation
      if (!userID || !password) {
        return res.status(400).json({ errorMessage: "Please enter all required fields" });
      }
  
      // query the database to check if the user exists
      db.query('SELECT * FROM users WHERE userID = ?', [userID] ,async(error, result, fields)=>{
        if(error) throw error

        const existingUser = result[0];

        if (!existingUser) {
          return res.status(401).json({ errorMessage: "Wrong user ID or password" });
        }
    
        // compare the passwords
        const passwordCorrect = await  bcrypt.compare(password, existingUser.password);
    
        if (!passwordCorrect) {
          return res.status(401).json({ errorMessage: "Wrong user ID or password" });
        }
// log user in
            const token = jwt.sign({ user: existingUser.id }, 'process.env.JWT_SECRET');
            
            // send a token in a HTTP only cookie
            res.cookie("token", token, { httpOnly: true }).send();
            console.log("Token successfully sent");
      });
  
      
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: "Server error" });
    }
  });
  
router.get("/logout", async(req,res)=>{
    res.cookie("token", "", {
        httpOnly:true,
        expires: new Date(0)
    }).send()
})


router.get("/loggedIn",(req, res)=>{
    try {
        const token  = req.cookies.token
        // if(userId == undefined){
        //     res.status(400).json({success: false , msg: "token is undefined"})
        // }
        if(!token) return res.json(false)
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified.user
        res.json(true)
      } catch (error) {
        console.log(error);
        res.json(false)
    }
    
}

)










module.exports = router