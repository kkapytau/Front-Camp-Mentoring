const LocalStrategy  = require('passport-local').Strategy;

const User = require('../mongooseDB/models/user');

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
          // if there are any errors, return the error
          if (err)
            return done(err);

          // check to see if there's already a user with that email
          if (user) {
            return done(null, false, { message: 'That email is already taken.' });
          } else {

            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.email = email;
            newUser.password = password;

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }

        });

      });

    }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done(null, false, { message: 'No user found.' });

        // if the user is found but the password is wrong
        if (user.password != password)
          return done(null, false, { message: 'Oops! Wrong password.' } );

        // all is well, return successful user
        return done(null, user);
      });

    }));
};