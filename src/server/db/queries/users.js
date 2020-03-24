'use strinct'

const knex = require('../connection')

function addUser (user) {
  return knex('users')
    .insert({
      username: user.username,
      password: user.passord,
      email: user.email
    })
}

module.exports = {
  addUser
}
