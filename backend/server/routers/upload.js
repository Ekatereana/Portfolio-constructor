'use strict';

const Router = require('koa-router');

const router = new Router();
router.post('/upload/image', async ctx => {
  console.log('uploading image');
  console.log('eq');
  console.log(ctx.request.data);
  const file = ctx.request.data;
  console.log(file);
});

module.exports = router;
