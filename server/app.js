const express = require('express');
const session = require('express-session')
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const db = require('./db')
const cors = require('cors')
const cookieParser = require("cookie-parser")
/////////// Cors setup /////////
app.use(
  cors({
    origin:['http://localhost:3000'],
    credentials: true
  })
)
// //////// ROUTER EXPORTS 
const authRoute = require('./routes/authRoute')
const historyRoute = require('./routes/historyRoute')
const itemRoute = require('./routes/itemRoute')
const orderRoute = require('./routes/orderRoute')
const transferRoute = require('./routes/transferRoute')
const uidRoute = require('./routes/uidRoute')
const userRoute = require('./routes/userRoute')

//////////
 const io = socketIO(server,{
  cors:{
    origin: ['http://localhost:3000']
  }
});
module.exports.io = io
app.use(bodyParser.json())
// Serve static files from the public directory
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

// Listen for Socket.io connections
io.on('connection', (socket) => {
  console.log("user connected");
  // Listen for a 'message' event from the client
  // socket.on('compare', (data) => {
  //   console.log('Message received from client:', data);
  // });

  // Listen for the disconnection of a client
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}))

app.post('/check_user', async(req, res)=>{
  const macAddress = 'C8:F0:9E:F7:9F:04'
  const {uid, mac_address,place} = req.body
  if(macAddress !== mac_address){  
  }
  db.query('SELECT * FROM users WHERE userUID = ?',uid,(error, result, fields)=>{
    if(error) throw error;

    if(result.length >0){
    res.status(200).json({message:"Scan Your Items"})
     io.emit('user_data', {registered:true, userData:result[0], place:place})

     db.query('INSERT INTO checkMac SET ? ', {mac:mac_address, userID:uid}, (error, result, fields)=>{
      if(error) throw error;
      console.log("Row inserted successfully");
     })
    }else{
      res.status(200).json({ message:"user id not registered"})
      io.emit('user_data', {registered:false, userData:null,place:place, userUID:uid})
    }
  })
})

app.post('/', async(req, res)=>{
  console.log("it is in");
  const macAddress = 'C8:F0:9E:F7:9F:04'
  const {uid, mac_address,place} = req.body
  if(macAddress !== mac_address){
    
  }
  db.query('SELECT * FROM items WHERE itemID = ?', [uid], (error, result)=>{
    if(error) throw error;
    const itemData = result[0]
    if(result.length > 0){
      db.query("SELECT * FROM checkMac WHERE mac = ?", [mac_address], (error, result, fields)=>{
        if(error) throw error
        if(result.length > 0){
          db.query('SELECT * FROM orders WHERE productID=? AND userID = ?',[uid,'123'], (error, result)=>{
           if(error) throw error;
           if(result.length>0){
            io.emit('message', {success:true, itemData:itemData, authorised:true})
            res.status(200).json({condition:"authorised", message:"item Approved for User"})
           }else{
            io.emit('message', {success:false, itemData:itemData, authorised:false})
            res.status(200).json({condition:"unauthorised", message:"user is theft"})
           }
          })
        }else{
           res.status(200).json({message:"Pleace Scan user card First"})
        }
       })
    }else{
      res.status(200).json({message:"item not registerd"})
      io.emit('message', {success:false, itemData:null})
    }
    
  })
   
})
// Start the server
server.listen(5000, () => {
  console.log('Server started on port 5000');
});
app.use('/user',userRoute)
app.use('/auth',authRoute)
app.use('/history',historyRoute)
app.use('/item',itemRoute)
app.use('/order',orderRoute)
app.use('/transfer',transferRoute)
app.use('/uid',uidRoute)

//////// for file upload
app.use('/uploads', express.static('uploads'));

