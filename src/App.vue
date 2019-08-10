<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>      
    </transition>
  </div>
</template>
<script>
import superagent from 'superagent'

export default {
  name: 'app',
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      superagent
        .get('/api/getuserinfo')
        .end((err, res) => {
          let body = res && res.body || {};
          if (body.code === 200) {
            window.user = body.data;
          }
        });
    }
  }
};
</script>
<style lang="less">
html, body {
  margin: 0;
}
</style>