'use strict'
// test for authorization
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

const server = require('../app')
const knex = require('../backend/server/db/connection')

chai.use(chaiHttp)

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
			res.type.should.eql("application/json")
			// this requements will be chanched.
			// res.text.should.contain('<h1>Register</h1>')
			// res.text.should.contain(
			// 	'<p><button type="submit">Register</button>')
			done()

		})
	})
})

//post request to register user
describe('POST /auth/register', () => {
	it('should register a new user', (done) => {
		chai.request(server)
		.post('/auth/register')
		.send({
			username: 'unicorn',
			password: 'my_little_pony'
		})
		.end((err, res) => {
			should.not.exist(err)
			//res.redirects[0].should.contain('/home')
			done()
		})
	})
})

describe('GET /auth/login', () => {
	it('should render the login view', (done) => {
	   chai.request(server)
	   .get('/auth/login')
	   .end((err, res) => {
	   	should.not.exist(err)
	   	res.redirects.length.should.eql(0)
	   	res.status.should.eq(200)
	   	res.type.should.eql('application/json')
	    done()
	   })

	})
})

