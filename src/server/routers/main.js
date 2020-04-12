'use strict'

const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx) => {
	ctx.body = {
		status: 'success',
		message: 'It\'s the main page of the service'
	}
})

module.exports = router
