'use strict'

const Koa = require('koa')
const path = require('path')
const render = require('./lib/render/render')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const Logger = require('koa-logger')
const passport = require('koa-passport')
const BASE_PATH = '/src/server/'
const Router = require('koa-router')
// authentication
require(path.join(__dirname, BASE_PATH, '/auth'))
const authRoutes = require(path.join(__dirname, BASE_PATH, 'routers/auth'))
const indexRoutes = require(path.join(__dirname, BASE_PATH, '/routers/home'))

const app = new Koa()
const router = new Router()

// sessions settings
app.keys = [process.env.KEY_A, process.env.KEY_H]
app.use(session(app))

router.get('/home', home)

app.use(render)
app.use(router.routes)

/*
app.use(async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Hello World'
  }
})// to use all routes that include in basic router
  .use(indexRoutes.routes())
  // to parse request body
  .use(bodyParser())
*/

app.use(passport.initialize())
app.use((authRoutes.routes()))

// to log all info
app.use(Logger())

async function home (ctx) {
  await ctx.render('index')
}

const server = app.listen(8080, () => {
  console.log('Start portfolio-constructor server!')
})

module.exports = server
