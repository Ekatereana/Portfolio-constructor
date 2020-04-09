exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
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

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};