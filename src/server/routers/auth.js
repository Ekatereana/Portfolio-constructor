'use strict'

const Router = require('koa-router')
const passport = require('koa-passport')
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users')

const router = new Router()

router.get('/auth/register', async (ctx) => {
  ctx.type = 'html'
  // we don`t have react-views yet
  // ctx.body = fs.createReadStream('./src/server/views/sth')
})

router.post('/auth/register', async (ctx) => {
  const user = await queries.addUser(ctx.request.body)
  return passport.authenticate('local', (err, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.redirect('/home')
    } else {
      ctx.status = 400
      ctx.body = { status: 'error' }
    }
    if (err) {
      console.log(err.stack)
    }
  })(ctx)
})

router.get('/home', async (ctx) => {
  if (ctx.isAuthentificated()) {
    ctx.type = 'html'
    // there will be some view
    // ctx.body = fs.createReadStream(...)
  }
})
module.exports = router
