const { createServer } = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoute');
const itemRouter = require('./routes/itemRoute');
const orderRouter = require('./routes/orderRoute');
const uidRouter = require('./routes/uidRoute');
const authRouter = require('./routes/authRouter');

const app = express();

// Set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header('Access-Control-Allow-Methods', 'GET,DELETE, PUT, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true // enable cookies
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(5000, ()=>{
  console.log("the server is runnin in port 5000");
})

const io = socketIo(server)

io.on('connection', (socket)=>{
  console.log("new Connection");
})
io.origins('http://localhost:3000')

//const io = socketIo(server);

// Middleware to make the io object available to routes
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });



// Routes middleware
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/order', orderRouter);
app.use('/rfid', uidRouter);
app.use('/auth', authRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const port = process.env.APP_PORT || 5000;

// Listen on port


// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;