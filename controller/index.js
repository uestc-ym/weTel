const fs = require('fs');
const path = require('path');

function render({
  title,
  appData
}) {
  const htmlUrl = path.resolve(__dirname, "../public/index.html");

  return new Promise(( resolve, reject ) => {
    fs.readFile(htmlUrl, "binary", ( err, data ) => {
      if (err) {
        reject(err);
      } else {
        const scriptStr = `<script type="text/javascript">window.appData = ${JSON.stringify(appData)}</script>`;
        const splitBody = data.split('</body>');
        const htmlStr = splitBody[0] + scriptStr + '</body>' + splitBody[1];

        resolve( htmlStr );
      }
    })
  })
}

const routes = [{
  url: [
    '/app',
    '/app/home',
    '/app/page/one'
  ],
  async controller(ctx, next) {
    const appData = {
      name: 'yemao',
      pois: [{poiName: 'fdsa', poiId: 23432}, {poiName: 'rewrwr', poiId: 8989}]
    };
  
    const res = await render({
      title: 'YYY', 
      appData
    });
  
    ctx.body = res;
    next();
  }
}, {
  url: '/test',
  async controller(ctx, next) {
    ctx.body = 'test';
  }
}];

module.exports = routes;