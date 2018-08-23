// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

// Define routes
router.get('/', function (req, res) {
    res.send('yo from profile');
});


module.exports = router;
