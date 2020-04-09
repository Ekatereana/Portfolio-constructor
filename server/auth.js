'use strict';
// there is code that used to handle serializing and de-serializing the user info to session

var passport = require('koa-passport');

// add localStrategy
var LocalStrategy = require('passport-local').Strategy;

// knex config
var knex = require('./db/connection');

// hashing passwords
var bcrypt = require('bcryptjs');

var options = {};

// password hashing
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// saved user id to the session to retrieve whole object later
// with deserialize-function
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  return knex('users').where({ id: id }).first().then(function (user) {
    done(null, user);
  }).catch(function (err) {
    done(err, null);
  });
});

passport.use(new LocalStrategy(options, function (username, password, done) {
  knex('users').where({ username: username }).first().then(function (user) {
    // no such user in db
    if (!user) return done(null, false);
    // does passwd match
    if (!comparePass(password, user.password)) {
      return done(null, user);
    } else {
      // incorrect passwd
      return done(null, false);
    }
  }).catch(function (err) {
    return done(err);
  });
}));