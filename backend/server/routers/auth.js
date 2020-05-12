'use strict';

const Router = require('koa-router');
const passport = require('../auth');
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users');

const router = new Router();

// registration part
router.get('/auth/register', async (ctx) => {
  ctx.type = 'application/json';
});

router.post('/auth/register', async (ctx, next) => {
  let user = await queries.getUser(ctx.request.body);
  if (user) {
    ctx.body = { error: 'user already exist' };
  } else {
    console.log('post register');
    user = await queries.addUser(ctx.request.body);
    console.log('after add');

    return passport.authenticate('local', (err, info, status) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (user) {
          ctx.login(user);
          ctx.redirect('/home');
        } else {
          ctx.status = 400;
          ctx.body = { status: 'error' };
        }
      }
    })(ctx, next);
  }
});

// login part
router.get('/auth/login', async (ctx) => {
  console.log('get login');
  if (!ctx.isAuthenticated()) {
    ctx.type = 'application/json';
    ctx.redirect('/auth/register');
  } else {
    ctx.redirect('/home');
  }
});

router.post('/auth/login', async (ctx, next) => {
  console.log('start login');
  console.log(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    console.log(user);
    if (err) {
      console.log('error with login');
      console.log(err.stack);
      ctx.status = 400;
    } else {
      if (user) {
        console.log('login me');
        ctx.login(user);
        ctx.redirect('/home');
      } else {
        ctx.status = 400;
        console.log('error with user auth');
        ctx.body = { status: 'error' };
      }
    }
  })(ctx, next);
});

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthentificated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/home', async (ctx) => {
  console.log('home');
  console.log(ctx.state);
  if (ctx.isAuthenticated()) {
    console.log('is auth');
    console.log(ctx.state);
    ctx.body = ctx.state.user;
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;
