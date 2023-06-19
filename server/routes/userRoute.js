const router = require("express").Router()
const db = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
////// MULTER SETUP OF USER PROFILE
////////////////////////////////

const jwtSecret = 'mysecretkey'

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
    // try {
    //     const {password} = req.body;
    //     const hashedPassword = await bcrypt.hash(password, 10)
    //     const userData = {...req.body, password:hashedPassword}
    //     console.log(userData);
    //     const query = 'INSERT INTO users SET ?'
    //     db.query(query, userData, (error, result, field)=>{
            
    //         if (error) {
    //             console.log(error);
    //             res.status(500).send('Server error')
    //         }else{
    //             console.log("User created");
    //             res.status(201).send("User create")
    //         }
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("Server error")
    // }
})

// user login end point
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
// Protected route for admin
router.get('/admin/protected', isAdmin, (req, res)=>{

})
// Protected route for user 
router.get('/user/protected', isUser, (req, res)=>{
    res.send('User protected resource')
})
module.exports = router