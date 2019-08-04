const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const router = require('koa-router')()
const appRoutes = require('./controller/index.js')
const apiRoutes = require('./controller/api/index.js')
const session=require('koa-session')
const auth = require('./server/middlewares/auth.js')

const app = new Koa()
//process.env.NODE_ENV = 'production'

// session加密处理
app.keys = ['this is my secret and fuck you all']; 
app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, app));

// middlewares
app.use(auth);

// 页面路由
appRoutes.forEach(r => {
  const {url, controller} = r;
  if (Array.isArray(url)) {
    url.forEach(u => {
      router.get(u, async (ctx, next) => controller(ctx, next));  
    })
  } else {
    router.get(url, async (ctx, next) => controller(ctx, next));
  }
});

// api路由
apiRoutes.forEach(api => {
  const {url, method, middlewares, controller} = api;
  if (middlewares && middlewares.length) {
    middlewares.forEach(m => {
      app.use(m);
    })
  }
  router[method](url, async (ctx, next) => controller(ctx, next));
})

app.use(router.routes());
app.use(router.allowedMethods());

// 访问静态资源
app.use(static(
  path.join( __dirname,  '/')
))

app.listen(3030, () => {
  console.log('weTel app is starting at port 3030')
})