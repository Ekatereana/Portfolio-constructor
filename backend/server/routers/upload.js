'use strict';

const Router = require('koa-router');
const uploadFile = require('./../uploadFile');

const router = new Router();

router.post('/upload/image', async ctx => {
  console.log('uploading image');
  console.log(ctx.request.data);
  const file = ctx.request.data;
  console.log(file);
  const { key, url } = await uploadFile.uploadFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type
  });
  ctx.body = { key, url };
});

module.exports = router;
