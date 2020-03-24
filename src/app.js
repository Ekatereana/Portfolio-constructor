'use strict'
require('dotenv').config()

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const Logger = require('koa-logger')
const passport = require('koa-passport')

const app = new Koa()
const authRoutes = require('./routes/auth')

// sessions settings
app.keys = [process.env.KEY]
app.use(session(app))

app
  .use(async ctx => {
    ctx.body = {
      status: 'success',
      message: 'Hello World'
    }
  })
  // to use all routes that include in basic router
  .use(authRoutes.routes())
  // to parse request body
  .use(bodyParser())

// authentication
require('./auth')
app.use(passport.initialize())

// to log all info
app.use(Logger())

const server = app.listen(8080, function () {
  console.log('Start portfolio-constructor server!')
})

module.exports = server
