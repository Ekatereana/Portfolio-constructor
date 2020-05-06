'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users');

const router = new Router();

// registration part
router.get('/auth/register', async (ctx) => {
  ctx.type = 'application/json';
  // we don`t have react-views yet
  // ctx.body = fs.createReadStream('./backend/server/views/sth')
});

router.post('/auth/register', async (ctx) => {
  console.log('post register');
  const user = await queries.addUser(ctx.request.body);

  return passport.authenticate('local', (err, info, status) => {
    if (err) {
      console.log(err.stack);
    } else {
      if (user) {
        ctx.login(user, async (err) => {
          console.log(err);
          await err ? ctx.body = err : ctx.redirect('/home');
        });
        ctx.type = 'application/json';
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    }
  })(ctx);
});

// login part
router.get('/auth/login', async (ctx) => {
  console.log('get login');
  if (!ctx.isAuthentificated()) {
    ctx.type = 'application/json';
    ctx.redirect('/auth/register');
  } else {
    ctx.redirect('/home');
  }
});

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      console.log(err.stack);
      ctx.status = 400;
    } else {
      if (user) {
        ctx.login(user);
        ctx.redirect('/auth/status');
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    }
  })(ctx);
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
  if (ctx.isAuthentificated()) {
    ctx.type = 'html';
    // there will be some view
    // ctx.body = fs.createReadStream(...)
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;
