'use strict'

const Router = require('koa-router')
const passport = require('koa-passport')
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users')

const router = new Router()

// registration part
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

// login part
router.get('/auth/login', async (ctx) => {
  if (!ctx.isAuthentificated()) {
    ctx.type = 'html'
    // there should be some react login view
    // ctx.body = .....
  } else {
    ctx.redirect('/home')
  }
})

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.redirect('/auth/status')
    } else {
      ctx.status = 400
      ctx.body = { status: 'error' }
    }
    if (err) {
      console.log(err.stack)
      ctx.status = 400
    }
  })(ctx)
})

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthentificated()) {
    ctx.logout()
    ctx.redirect('/auth/login')
  } else {
    ctx.body = { success: false }
    ctx.throw(401)
  }
})

router.get('/home', async (ctx) => {
  if (ctx.isAuthentificated()) {
    ctx.type = 'html'
    // there will be some view
    // ctx.body = fs.createReadStream(...)
  } else {
    ctx.redirect('/auth/login')
  }
})

module.exports = router
