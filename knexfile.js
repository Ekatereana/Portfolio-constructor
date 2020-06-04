// Update with your config settings.
require('dotenv').config();

const path = require('path');

const BASE_PATH = path.join(__dirname, 'backend', 'server', 'db');

module.exports = {

  test: {
    client: 'pg',
    connection: ' postgres://basic:2110vfvf@localhost:5432/portfolio-const',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    ssl: true
  }
};
