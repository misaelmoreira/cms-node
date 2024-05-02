var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var routes = require('./app/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(function(req,res,next){
  res.setHeader('Cache-Control', 'max-age=30, public'); //cache funciona para todas as instancias CDN e Browser
  //res.setHeader('Cache-Control', 'max-age=30, private'); //cache funciona para o CDN 
  //res.setHeader('Cache-Control', 'max-age=30, no-cache'); //nao col0ca cache no Browser
  //res.setHeader('Cache-Control', 'max-age=30, no-store'); //nao aramazena cache no computador

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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

const port = 3000;
app.listen(port, () => console.log("Server is running on port: " + port));


module.exports = app;
