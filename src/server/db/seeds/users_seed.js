const bcrypt = require('bcryptjs')

exports.seed = function (knex) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync('12345OMG', salt)
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Kate',
          email: 'ekatereanagricaenko@gmail.com',
          password: hash
        }
      ])
    })
}
