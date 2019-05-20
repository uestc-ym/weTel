<template>
<div class="home">
    hello,world!

    <div>
      <span class="text home-one">one</span>
      <span class="text home-two">two</span>
      <span class="text home-three">three</span>
    </div>
    <div class="content">
      <span class="content-a">contentA</span>
      <span class="content-b">contentB</span>
      <span class="content-c">contentC</span>
    </div>

    <div class="data">{{name}}</div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    let a = () => 'yemao';
    return {
      name: a()
    }
  }
};
</script>
<style lang="less">
body {
  margin: 0;
}
.home {
  color: green;
  &-one {
    color: red;
  }
  .text {
    font-size: 16px;
    &:last-child {
      font-size: 30px;
      transform: scale(1.5);
    }
  }

  .content {
    margin-top: 20px;
    display: flex;
    color: black;
    &-a {
      background: red;
      width: 100px;    
    }
    &-b {
      text-align: center;
      background: yellow;
      flex: 1;
    }
    &-c {
      width: 100px;
      text-align: right;
      background: green;
    }
  }
}
</style>