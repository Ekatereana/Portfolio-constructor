'use strinct';

const knex = require('../connection');

const bcrypt = require('bcryptjs');

async function addUser (user) {
  const salt = await bcrypt.genSaltSync();
  const hash = await bcrypt.hashSync(user.password, salt);
  return knex('users')
    .insert({
      name: user.name,
      email: user.email,
      password: hash
    }).returning('*');
}

module.exports = {
  addUser
};
