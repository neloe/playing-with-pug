require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/product.js')

const mongoose = require('mongoose')

var app = express();

const db_conn_str = process.env.MONGO_CONN

mongoose.connect(db_conn_str, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SET UP PASSPORT
const User = require('./models/userModel')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user){
    if (err) return done(err);
    if (!user) return done(null, false, {message: 'Incorrect username.'})
    bcrypt.compare(password, user.pwhash).then((res) => {
      if (res) return done(null, user)
      return done(null, false, {message: 'Incorrect password.'})
    })
  })
}))

const session = require('express-session')
const bodyParser = require('body-parser')

app.use(session({secret: 'ceiling cat'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// ---

app.use('/', indexRouter);
// localhost:3000/users
app.use('/users', usersRouter);
// localhost:3000/products
app.use('/products', productRouter)

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
