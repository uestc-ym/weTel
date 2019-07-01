const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const appRoute = require('./controller/index.js')

const app = new Koa()

// 访问静态资源
/*app.use(static(
  path.join( __dirname,  '/')
))*/

app.use(appRoute.routes());

app.listen(3030, () => {
  console.log('weTel app is starting at port 3030')
})