// Update with your config settings.
require('dotenv').config();

const path = require('path');

const BASE_PATH = path.join(__dirname, 'backend', 'server', 'db');

module.exports = {

  test: {
    client: 'pg',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      port: 5432,
      password: '2120',
      database: 'portfolio-const'
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }

};
