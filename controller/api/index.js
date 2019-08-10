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
  url: '/api/logout',
  method: 'post',
  middlewares: [require('koa-bodyparser')()],
  async controller(ctx, next) {
    ctx.session = null;

    ctx.body = {
      code: 200,
      data: true
    }
  }
}, {
  url: '/api/signup',
  method: 'post',
  middlewares: [require('koa-bodyparser')()],
  async controller(ctx, next) {
    const body = ctx.request.body;
    let res;
    if (body.type === 1) { // 注册
     res = await User.signUp(body);
    } else { // 登录
      res = await User.login(body);
    }
    
    if (res.code === 200) {
      ctx.session.user = {
        name: body.name
      };
    } 

    ctx.body = res;
  }
}, {
  url: '/api/getuserinfo',
  method: 'get',
  async controller(ctx, next) {
    ctx.body = {
      code: 200,
      data: {
        ...ctx.session.user
      }
    };
  }
}, {
  url: '/api/getusers',
  method: 'get',
  async controller(ctx, next) {

    const res = await User.getAllUsers();
    ctx.body = res;
  }
}, {
  url: '/api/getmessages',
  method: 'get',
  async controller(ctx, next) {
    let query = ctx.request.query;
    const queryOne = {
      to: query.to,
      from: ctx.session.user.name
    }
    const queryTwo = {
      from: query.to,
      to: ctx.session.user.name
    }
    const requestList = [
      Message.getMessagesByUser(queryOne),
      Message.getMessagesByUser(queryTwo)
    ];

    const res = await Promise.all(requestList);
    let errRes = res.find(i => i.code !== 200);
    if (errRes) {
      ctx.body = errRes;
      return 
    }

    let resData = res[0].data.concat(res[1].data);

    ctx.body = {
      code: 200,
      data: resData.sort((a, b) => a.createdTime - b.createdTime)
    }
  }
}];

module.exports = apiRoutes;