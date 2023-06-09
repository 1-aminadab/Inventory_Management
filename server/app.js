var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql")


// Routers 
var indexRouter = require('./routes/index');
var userRouter = require("./routes/userRoute")
var itemRouter = require("./routes/itemRoute")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes middleware
app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/item', itemRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const port  = process.env.PORT || 5000
// MYSQL conneciton 

const pool = mysql.createPool({
  connectionLimit : 10,
  host:'localhost',
  user: 'root',
  password:'password',
  database:'inventoryDatabase'
})



// listen on port
app.listen(port,()=>console.log(`Listen on port  ${port}`))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('http://localhost:5000/addUsers',async(req, res)=>{
  
  const newUser = {firstName:"Amanuel",lastName:'Tadesse', password:"12345678" }
  await pool.query("INSERT INTO user set ?",[newUser])
  res.redirect('/user')
})

app.get("user", async(req, res)=>{
  res.send("there is something insomnia")
  const [rows] = await pool.query("SELECT * FROM user");
  res.render('user',{user: rows})
})


module.exports = app;