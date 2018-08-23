var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;

var db = require('../models');

// Provide serialize/deserialize functions 
passport.serializeUser(function (user, callback) {
    callback(null, user.id);
});
passport.deserializeUser(function (id, callback) {
    bd.user.findById(id).then(function (user) {
        callback(null, user);
    }).catch(function (err) {
        callback(err, null);  
    });
});

// Do the actual logging in part!

passport.use(new passportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, callback) {
    db.user.findOne({
        where: {email: email }
    }).then(function (foundUser) {
        if(!foundUser || !foundUser.isValidPassword(password)){
            callback('invalid user',null);
        }
        else {
            callback(null, foundUser);
        }
    }).catch(function (err) {
        callback(err, null);
    });
}));


module.exports = passport;
