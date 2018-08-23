// Require express
var express = require('express');
var passport = require('../config/passportConfig');

// Include models
var db = require('../models');

// Declare a new router
var router = express.Router();

// Define routes
router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    successFlash: 'Successfully logged in!',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid credentials'
}));

router.get('/signup', function (req, res) {
    res.render('auth/signup');
});

router.post('/signup', function (req, res) {
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: req.body
    }).spread(function (user, wasCreated) {
        if(wasCreated) { // This is expected behavior
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Successfully logged in!',
                failureRedirect: '/',
                failureFlash: 'Oh noes?'
            })(req,res);
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
