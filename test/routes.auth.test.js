'use strict'
// test for authorization
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../src/server/app')
const knex = require('../src/server/db/connection')

// common view for chai-describe
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

// get request to register user
describe('GET /auth/register', () => {
	// what shoul be done before executing (not server part)
	it('should render the register view', (done) => {
		chai.request(server)
		.get('/auth/register')
		// what we should get after executing get request
		.end((err, res) => {
			should.not.exist(err)
			res.redirects.length.should.eql(0)
			res.status.should.eql(200)
			res.type.should.eql("text/html")
			// this requements will be chanched.
			// res.text.should.contain('<h1>Register</h1>')
			// res.text.should.contain(
			// 	'<p><button type="submit">Register</button>')
			done()

		})
	})
})

// post request to register user
despribe('POST /auth/register', () => {
	it('should register a new user', (done) => {
		chai.request(server)
		.post('/auth/register')
		.send({
			username: 'unicorn',
			password: 'my_little_pony'
		})
		.end((err, res) => {
			should.not.exists(err)
			res.redirects[0].should.contain('/home')
			done()
		})
	})
})

