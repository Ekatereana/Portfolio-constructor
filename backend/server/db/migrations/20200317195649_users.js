exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.json('contactMe');
    table.json('aboutMe');
    table.json('home');
    table.json('services');
    table.json('portfolio');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
