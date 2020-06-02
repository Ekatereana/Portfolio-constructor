'use strict';

const Router = require('koa-router');
const passport = require('../auth');

const queries = require('../db/queries/users');

const router = new Router();

// registration part
router.get('/auth/register', async (ctx) => {
  ctx.type = 'application/json';
});

router.post('/auth/register', async (ctx, next) => {
  console.log('post register');
  let user = await queries.getUser(ctx.request.body);
  console.log(user);
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
          ctx.response.body = user;
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
  // ctx.logout();
  return passport.authenticate('local', (err, user, info, status) => {
    console.log('inside post login user: ');
    if (err) {
      console.log('error with login');
      console.log(err.stack);
      ctx.status = 400;
    } else {
      if (user) {
        console.log('login me');
        ctx.login(user);
        console.log('after login', ctx.isAuthenticated());
        ctx.response.body = ctx.state.user;
        // ctx.redirect('/home');
      } else {
        ctx.status = 400;
        console.log('error with user auth');
        ctx.body = { status: 'error' };
      }
    }
  })(ctx, next);
});

router.get('/auth/logout', async (ctx) => {
  console.log('try');
  if (ctx.isAuthenticated()) {
    console.log('logaut');
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/home', async (ctx) => {
  console.log('home');
  console.log('is auth before chack', ctx.isAuthenticated());
  if (ctx.isAuthenticated()) {
    console.log('is auth');
    ctx.response.body = ctx.state.user;
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;
