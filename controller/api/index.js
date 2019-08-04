const User = require('../../server/service/user.js');

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
}, {
  url: '/api/signup',
  method: 'post',
  middlewares: [require('koa-bodyparser')()],
  async controller(ctx, next) {
    const body = ctx.request.body;
    const res = await User.signUp(body);
    console.log(JSON.stringify(res));
    
    if (res.code === 200) {
      ctx.session.user = body.name;
    } 

    ctx.body = res;

  }
}];

module.exports = apiRoutes;