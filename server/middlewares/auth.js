module.exports = async (ctx, next) => {
    if (!ctx.session.user) {
      ctx.response.redirect('/app/signup');
      return;
    }
    await next();
}