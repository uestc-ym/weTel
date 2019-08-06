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
  name: 'app'
};
</script>
<style lang="less">
html, body {
  margin: 0;
}
</style>