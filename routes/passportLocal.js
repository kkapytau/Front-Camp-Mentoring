const express = require('express');
const router = express.Router();
const passport = require('passport');

/* Passport Start */

// show the signup form
router.get('/signup', function(req, res) {
  console.log("signup");
  res.send('It is sign up Form');
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/blogs', // redirect to the secure profile section
  failureRedirect : '/signup' // redirect back to the signup page if there is an error
}));

// show the login form
router.get('/login', function(req, res) {
  console.log("login");
  res.send('It is Login Form');
});
// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/blogs', // redirect to the secure profile section
  failureRedirect : '/login' // redirect back to the signup page if there is an error
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/* Passport End */

module.exports = router;