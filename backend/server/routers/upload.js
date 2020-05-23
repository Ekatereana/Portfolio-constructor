'use strict';

const Router = require('koa-router');
const { uploadFile } = require('../aws/uploadFile');

const router = new Router();

router.post('/upload/image', async (ctx, next) => {
  console.log('===router /upload/image===');
  const image = ctx.request.files.image;
  console.log('image: ', image);
  const { key, url } = await uploadFile(image);
  ctx.body = { key, url };
});

module.exports = router;
