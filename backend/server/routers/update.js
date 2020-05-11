'use strict';

const Router = require('koa-router');
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users');

const router = new Router();

router.post('/users/update/', async (ctx) => {
  console.log('users update');
  const user = await queries.updateUser(ctx.request.body);
  console.log(user);
  if (user) {
    ctx.body = ctx.state.user;
  } else {
    ctx.stus = 400;
    ctx.body = 'Internal Error';
  }
});

module.exports = router;
