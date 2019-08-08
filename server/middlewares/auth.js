const whiteList = ['/api/signup'];

module.exports = async (ctx, next) => {
  console.log(ctx.req.url, ctx.session)
    if (whiteList.indexOf(ctx.req.url) > -1) {
      await next();
      return;
    } 
    
    if (!ctx.session.user) {
      ctx.response.redirect('/app/signup');
      return;
    }

    await next();
}