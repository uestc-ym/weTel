
const apiRoutes = [{
  url: '/api/getdata',
  method: 'post',
  middlewares: [require('koa-bodyparser')()],
  async controller(ctx, next) {
    ctx.body = {
      code: 200, 
      data: 'pppppp'
    }
  }
}, {
  url: '/api/ss',
  method: 'get',
  async controller(ctx, next) {
    ctx.body = {
      code: 200, 
      data: 'ddd'
    }
  }
}];

module.exports = apiRoutes;