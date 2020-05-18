'use strinct';

const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.redirect('/main');
});

module.exports = router;
