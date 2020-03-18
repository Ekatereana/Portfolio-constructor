
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Kate',
          email: 'ekatereanagricaenko@gmail.com',
          password: '12345OMG'
        }
      ])
    })
}
