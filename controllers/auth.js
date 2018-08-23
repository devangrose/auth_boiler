// Require express
var express = require('express');

// Include models
var db = require('../models');

// Declare a new router
var router = express.Router();

// Define routes
router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', function (req, res) {
    console.log(req.body);
    res.send('login post route');
});

router.get('/signup', function (req, res) {
    res.render('auth/signup');
});

router.post('/signup', function (req, res) {
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: req.body
    }).spread(function (user, wasCreated) {
        if(wasCreated) { // This is expected behavior
            // TODO Automatically log user in
            res.redirect('/profile');
        }
        else { // User messed up, they already have a login
            // TODO Send user some sort of error message
            res.redirect('/auth/login');
        }
    }).catch(function (error) {
        console.log(error);
        res.render('error');
    });
});

router.get('/logout', function (req, res) {
    res.send('yo from auth logout page');
});


module.exports = router;
