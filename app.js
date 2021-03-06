var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("express-handlebars")
let mongoose = require('mongoose')
let expressValidation = require('express-validator');
let expressSession = require("express-session");

// Connect to database
mongoose.connect('mongodb://localhost:27017/siwesReg', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

let database = mongoose.connection;
database.once('open', ()=>{
  console.log('connected to the database')
})
database.on('error', (err)=>{
  console.log(err)
})
mongoose.Promise = global.Promise;

// import route API
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.engine('.html', hbs({extname: '.html', defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express validator middleware
app.use(expressValidation({
  errorFormatter: function(param, msg, value){
    let namespace = param.split('.'), root = namespace.shift(), formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    }
  }
}))

// express Session middleware
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Mask"
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
