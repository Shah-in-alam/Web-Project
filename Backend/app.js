const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
//Outh 
require('dotenv').config();
const passport = require('passport');
require('./config/passport-config');


// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');
const bookingRouter = require('./routes/booking');
const campaignRouter = require('./routes/campaign');
const featureRouter = require('./routes/feature');
const reviewRouter = require('./routes/review');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth'); 
const app = express();

// Enable CORS for all origins
app.use(cors());

// Set up a simple route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// ✅ Session setup (before passport.session)
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret', // Use a strong secret in .env
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
//Passport session//
app.use(passport.initialize());
app.use(passport.session());
// Use routers
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter); 
app.use('/booking', bookingRouter); 
app.use('/campaign', campaignRouter);
app.use('/feature', featureRouter);
app.use('/review',reviewRouter);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes); // 


// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
