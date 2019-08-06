const User = require('../../server/service/user.js');
const Message = require('../../server/service/message.js');

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
    
    if (res.code === 200) {
      ctx.session.user = {
        name: body.name
      };
    } 

    ctx.body = res;
  }
}, {
  url: '/api/getmessages',
  method: 'get',
  async controller(ctx, next) {
    let query = ctx.request.query;
    query = {
      ...query,
      from: ctx.session.user.name
    }
    console.log(query);

    ctx.body = await Message.getMessagesByUser(query);
  }
}];

module.exports = apiRoutes;