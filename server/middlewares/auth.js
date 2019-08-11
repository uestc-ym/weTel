const whiteList = ['/api/signup', '/app/signup'];
const skipPath = [
  /^\/public\//
];

module.exports = async (ctx, next) => {
  console.log(ctx.req.url, ctx.session)
    if (whiteList.indexOf(ctx.req.url) > -1 || skipPath.some(i => i.test(ctx.req.url))) {
      await next();
      return;
    } 
    
    if (!ctx.session.user) {
      ctx.response.redirect('/app/signup');
      return;
    }

    await next();
}