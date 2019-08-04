import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import tapDirective from '@client/component/Vue/utils/tap.js';
Vue.directive('tap', tapDirective);

//webpack按需加载组件
const testPage = r =>
  require.ensure([], () => r(require('../page/home/test')), 'test');

const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home');

const chat = r =>
require.ensure([], () => r(require('../page/home/chat')), 'chat');

const PageOne = r =>
require.ensure([], () => r(require('../page/home/pageOne')), 'pageOne');

const SignPage = r =>
require.ensure([], () => r(require('../page/home/signUp')), 'signUp');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/app/test',
      name: 'test',
      component: testPage
    },
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
      path: '/app/home/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/app/page/one',
      name: 'pageOne',
      component: PageOne
    },
    {
      path: '/app/signup',
      name: 'signUp',
      component: SignPage
    }
  ]
});