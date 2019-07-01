import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import PageOne from '../page/home/pageOne';
//webpack按需加载组件
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/page/one',
      name: 'pageOne',
      component: PageOne
    }
  ]
});