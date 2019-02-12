var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Rajoutés par rapport au projet généré

const bodyParser = require('body-parser');
const dotenv = require('dotenv').load();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//rajout
var testWebviewRouter = require('./routes/testWebview');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Parse data from application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Généré auto
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Rajout
app.use('/testWebview', testWebviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('erreur : ' + err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;