'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')

const app = new Koa()
const router = new Router()

app
  .use(async ctx => {
    ctx.body = 'Hello World'
  })
  .use(router.allowedMethods())
  // to use all routes that include in basic router
  .use(router.routes())
  // to parse request body
  .use(require('koa-body')())

// to log all info
app.use(Logger())

app.listen(8080, function () {
  console.log('Start portfolio-constructor server!')
})
