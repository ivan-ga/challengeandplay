var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
// var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.username':  username }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.ganadas_3enraya = 0;
          newUser.local.perdidas_3enraya = 0;
          newUser.local.totales_3enraya = 0;
          newUser.local.empatadas_3enraya = 0;
          newUser.local.ganadas_ajedrez = 0;
          newUser.local.perdidas_ajedrez = 0;
          newUser.local.totales_ajedrez = 0;
          newUser.local.empatadas_ajedrez = 0;
          newUser.local.ganadas_damas = 0;
          newUser.local.perdidas_damas = 0;
          newUser.local.totales_damas = 0;
          newUser.local.empatadas_damas = 0;
          newUser.local.ganadas_buscaminas = 0;
          newUser.local.perdidas_buscaminas = 0;
          newUser.local.totales_buscaminas = 0;
          newUser.local.empatadas_buscaminas = 0;
          newUser.local.name = username;
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
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username':  username }, function(err, user) {
      if (err)
          return done(err);
      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));
      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      return done(null, user);
    });
  }));
};
