const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const any = require('./routes/any');
const rest = require('./routes/rest');
const passportLocal = require('./routes/passportLocal');
const passport = require('passport');
const session = require('express-session')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

require('./public/javascripts/passport/localStrategy')(passport); // pass passport for configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// add middleware for POST
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

// required for passport
app.use(session({ secret: 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// uncomment that for Task 2
//app.use('*', any);

app.use('/blogs', rest);
app.use('/', passportLocal);

app.use('*', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
