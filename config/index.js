const _path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseVueLoaderConf = {
  postcss: {
    config: {
      path: _path.resolve('../')
    }
  },
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};

const devVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  //loaders
  loaders: {
    css: ['vue-style-loader', 'css-loader', 'postcss-loader'],
    postcss: ['vue-style-loader', 'css-loader', 'less-loader', 'postcss-loader']
  },
  cssSourceMap: true
});

const buildVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  loaders: {
    css: ExtractTextPlugin.extract({
      use: ['css-loader', 'postcss-loader'],
      fallback: 'vue-style-loader'
    }),
    postcss: ExtractTextPlugin.extract({
      use: ['css-loader', 'postcss-loader'],
      fallback: 'vue-style-loader'
    })
  },
  cssSourceMap: false
});

module.exports = {
  dev: {
    publicPath: '/',
    devtoolType: 'cheap-module-eval-source-map',
    vueloaderConf: devVueLoaderConf,
    host: 'localhost',
    port: '1235',
    proxyTable: {
      '/api': 'http://localhost:3030'
    }
  },
  build: {
    publicPath: '/',
    devtoolType: 'source-map',
    vueloaderConf: buildVueLoaderConf,
    staticPath: 'static'
  }
};