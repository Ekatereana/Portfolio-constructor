'use strinct';

const Router = require('koa-router');
const router = new Router();

router.get('/users', async (ctx) => {
  ctx.body = {
    status: 'success',
    users: [
      { fname: 'John', lname: 'Snow', id: '0' },
      { fname: 'Edward', lname: 'Stark', id: '1' },
      { fname: 'Wolf', lname: 'Black', id: '2' }
    ]
  };
});

module.exports = router;
