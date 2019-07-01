const router = require('koa-router')();

router.get('/api/getdata', async (ctx, next) => {
	ctx.body = {
		code: 200,
		data: 'oktttzz'
	}
})

module.exports = router;