'use strict'

const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const Logger = require('koa-logger')
const passport = require('koa-passport')
const BASE_PATH = '/src/server/'
// authentication
require(path.join(__dirname, BASE_PATH, '/auth'))
const authRoutes = require(path.join(__dirname, BASE_PATH, 'routers/auth'))
const indexRoutes = require(path.join(__dirname, BASE_PATH, '/routers/home'))

const app = new Koa()

// sessions settings
app.keys = [process.env.KEY_A, process.env.KEY_H]
app.use(session(app))

app
  .use(async ctx => {
    ctx.body = {
      status: 'success',
      message: 'Hello World'
    }
  })
  // to use all routes that include in basic router
  .use(indexRoutes.routes())
  // to parse request body
  .use(bodyParser())

app.use(passport.initialize())
app.use((authRoutes.routes()))

// to log all info
app.use(Logger())

const server = app.listen(8080, function () {
  console.log('Start portfolio-constructor server!')
})

module.exports = server
