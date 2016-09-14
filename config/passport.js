var LocalStrategy = require('passport-local').Strategy,
  User = require('../app/models/user.model');


module.exports = function(passport) {
  // passport session setup required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  //used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  //deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //sign up
  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true //allows us to pass back the entire req to the callback
    },
    function(req, email, password, done) {
      //asynchronous
      process.nextTick(function() {
        User.findOne({
          'email': email
        }, function(err, user) {
          if (err) return next(err);
          //check if there is already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken'));
          } else {
            var newUser = new User();
            newUser.email = email;
            newUser.password = password;
            //save new user
            newUser.save(function(err) {
              if (err) {
                for(var key in err.errors){
                return done(null, false,   req.flash('signupMessage',err.errors[key].message));
              }
              }
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  //login
  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        //see if the user trying to login already exists
        User.findOne({
          'email': email
        }, function(err, user) {
          if (err) return next(err);
          //if user found
          if (user) {
            user.authenticate(password, function(err, match_password) {
              if (match_password) {
                return done(null, user);
              } else {
                return done(null, false, req.flash('loginMessage', 'Wrong password'));
              }
            });
          } else {
            //if user not found
            return done(null, false, req.flash('loginMessage', 'No user found'));
          }
        });
      });
    }
  ));




};
