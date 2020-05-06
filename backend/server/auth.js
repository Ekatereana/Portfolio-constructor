'use strict';// there is code that used to handle serializing and de-serializing the user info to session

const passport = require('koa-passport');

// add localStrategy
const LocalStrategy = require('passport-local').Strategy;
// knex config
const knex = require('./db/connection');

// hashing passwords
const bcrypt = require('bcryptjs');

const options = {};

// password hashing
function comparePass (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// saved user id to the session to retrieve whole object later
// with deserialize-function
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const id = user[0].id;
  return knex('users').where({ id }).first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (email, password, done) => {
  console.log('loacal Strategy');
  knex('users').where({ email }).first()
    .then((user) => {
    // no such user in db
      if (!user) return done(null, false);
      // does passwd match
      if (!comparePass(password, user.password)) {
        return done(null, user);
      } else {
      // incorrect passwd
        return done(null, false);
      }
    })
    .catch((err) => { return done(err); });
}));
