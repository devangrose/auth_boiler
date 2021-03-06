// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');

// Declare app variable 
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true
}));
// Make sure session is above these
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/// Custom middleware -FUN!
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
});

// Controllers
app.use('/auth',require('./controllers/auth.js'));
app.use('/profile',require('./controllers/profile.js'));

// Define routes
app.get('/', function (req, res){
    res.render('home');
});
app.get('*', function (req, res) {
    res.render('error');
});

// Listen on port 3000
app.listen(3000);
