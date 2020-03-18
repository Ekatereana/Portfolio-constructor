exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
