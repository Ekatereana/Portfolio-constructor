'use strinct'

const Router = require('koa-router')
const router = new Router()

router.get('/home', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'There will be portfolio-constructor!'
  }
})

module.exports = router
