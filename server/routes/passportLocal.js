const express = require('express');
const router = express.Router();
const passport = require('passport');
const url = require('url');
/* Passport Start */


// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/api/user', // redirect to the secure profile section
  failureRedirect : '/api/login', // redirect back to the signup page if there is an error
  failureFlash : true
}));

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/api/user', // redirect to the secure profile section
  failureRedirect : '/api/login', // redirect back to the signup page if there is an error
  failureFlash: true
}));


router.get('/user', function(req, res) {
    console.log("current user is:")
    console.log(req.user)
    res.json(req.user);
});

// show the login form
router.get('/login', function(req, res) {
    const msg = req.flash('message')[0];
    res.json({message: msg});
});


router.get('/logout', function(req, res) {
  req.logout();
    /*const origin = (req.get('Origin'))
        ? req.get('Origin')
        : url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: ""
        })*/
  res.redirect('/api/user');
});

/* Passport End */

module.exports = router;