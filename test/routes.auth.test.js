'use strict'
// test for authorization
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../src/server/app')
const knex = require('../src/server/db/connection')

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest() })
      .then(() => { return knex.seed.run() })
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })
})

describe('GET /auth/register', () => {
	it('should render the register view', (done) => {
		chai.request(server)
		.get('/auth/register')
		.end((err, res))
	})
})

