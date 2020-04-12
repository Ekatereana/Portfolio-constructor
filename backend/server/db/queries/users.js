'use strinct'

const knex = require('../connection')

const bcrypt = require('bcryptjs')

function addUser (user) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(user.password, salt)
  return knex('users')
    .insert({
      username: user.username,
      password: hash,
      email: user.email
    }).returning('*')
}

module.exports = {
  addUser
}
