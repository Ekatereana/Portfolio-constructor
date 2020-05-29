'use strict';

const Router = require('koa-router');
// to create read stream
// const fs = require('fs')
const queries = require('../db/queries/users');

const router = new Router();

router.post('/update', async (ctx) => {
  console.log('will be uodate', ctx.request.body);
  const user = await queries.updateUser(ctx.request.body.user);
  console.log(user);
  if (user) {
    ctx.body = ctx.request.body.user;
    console.log('updated', ctx.body);
  } else {
    ctx.stus = 400;
    ctx.body = 'Internal Error';
  }
});

module.exports = router;
