// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var passport = require('passport');

// Declare app variable 
var app = express();

// Set and use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.get('/', function (req, res){
    res.send('hi from home route!');
});

// Listen on port 3000
app.listen(3000);
