'use strict';// there is code that used to handle serializing and de-serializing the user info to session

const passport = require('koa-passport');

// add localStrategy
const LocalStrategy = require('passport-local').Strategy;
// knex config
const knex = require('./db/connection');

// hashing passwords
const bcrypt = require('bcryptjs');

const options = {
  usernameField: 'email',
  passwordField: 'password'
};

// saved user id to the session to retrieve whole object later
// with deserialize-function
passport.serializeUser((user, done) => {
  console.log('====serializeUser===');
  done(null, user);
});

passport.deserializeUser((ctx, user, done) => {
  console.log('===deserializeUser===');
  const id = Array.isArray(user) ? user[0].id : user.id;
  console.log('user id: ', id);
  return knex('users').where({ id }).first()
    .then((user) => {
      console.log('user inside then in case of correct: ', user);
      done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err, null);
    });
});

passport.use('local', new LocalStrategy(options, async (email, password, done) => {
  console.log('===Local Strategy===');
  knex('users').where({ email }).first()
    .then((user) => {
    // no such user in db
      if (!user) return done(null, false);
      // does passwd match
      //
      if (bcrypt.compareSync(password, user.password)) {
        console.log('===passwords mach===');
        return done(null, user);
      } else {
      // incorrect password
        return done(null, false);
      }
    })
    .catch((err) => { return done(err); });
}));

module.exports = passport;
