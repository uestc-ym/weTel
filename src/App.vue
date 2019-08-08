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
export default {
  name: 'app',
  created() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://cdn.bootcss.com/socket.io/2.0.4/socket.io.slim.js')
    document.head.appendChild(recaptchaScript)
  }
};
</script>
<style lang="less">
html, body {
  margin: 0;
}
</style>