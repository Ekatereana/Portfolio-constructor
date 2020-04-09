'use strinct';

var knex = require('../connection');

var bcrypt = require('bcryptjs');

function addUser(user) {
  var salt = bcrypt.genSaltSync();
  var hash = bcrypt.hashSync(user.password, salt);
  return knex('users').insert({
    username: user.username,
    password: hash,
    email: user.email
  }).returning('*');
}

module.exports = {
  addUser: addUser
};