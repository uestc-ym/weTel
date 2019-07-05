import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home');

const PageOne = r =>
require.ensure([], () => r(require('../page/home/pageOne')), 'pageOne');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/app',
      redirect: '/app/home'
    },
    {
      path: '/app/home',
      name: 'home',
      component: home
    },
    {
      path: '/app/page/one',
      name: 'pageOne',
      component: PageOne
    }
  ]
});