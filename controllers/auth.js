// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

// Define routes
router.get('/login', function (req, res) {
    res.send('yo from auth login page');
});

router.post('/login', function (req, res) {
    res.send('login post route');
});

router.get('/signup', function (req, res) {
    res.send('yo from auth signup page');
});

router.post('/signup', function (req, res) {
    res.send('signup post route');
});

router.get('/logout', function (req, res) {
    res.send('yo from auth logout page');
});


module.exports = router;
