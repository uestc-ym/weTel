<template>
<div class="home">
    hello,world!

    <div>
      <span class="text home-one" @click="goPageOne">one</span>
      <span class="text home-two">two</span>
      <span class="text home-three">three</span>
    </div>
    <div class="content">
      <span class="content-a">contentA</span>
      <span class="content-b">contentB</span>
      <span class="content-c">contentC</span>
    </div>

    <div class="data">{{name}}</div>

    <div class="canvas-wrapper">
      <canvas id="test-canvas" />
      <img style="position: absolute;top: -1000px;left: -1000px;" id="img" src="https://p0.meituan.net/scarlett/179002cea64a2add40fb2eeaa7bc046e19731.png" />
      <img style="position: absolute;top: -9000px;left: -9000px;" id="imgFooter" src="https://p0.meituan.net/scarlett/1e722b6b91e529de108a88d1888839359923.png" />
    </div>

    <div class="home-block3">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>

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
  },
  mounted() {
    console.log(window.appData);
    this.drawCanvas();
  },
  methods: {
    goPageOne() {
      this.$router.push('/app/page/one');
    },
    drawCanvas() {
      const canvas = document.getElementById('test-canvas');
      canvas.width = 596;
      canvas.height = 842;
      canvas.style.width = '200px';
      canvas.style.height = '283px';
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#F9BE00';
      ctx.fillRect(0, 0, 596, 842);

      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, 596, 172);

      this.assetRules.forEach((i, idx) => {
        ctx.textAlign = 'end';
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#040000';
        ctx.fillText(`充${i.deposit}元`, 288, 232 + idx * 50);

        ctx.textAlign = 'start';
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ff5527';
        ctx.fillText(`送${i.grant}元`, 308, 232 + idx * 50);
      });

      window.img.onload = () => {
        ctx.drawImage(document.getElementById('img'), 76, 48);        
      };
      window.imgFooter.onload = () => {
        ctx.drawImage(document.getElementById('imgFooter'), 117, 657);
      }
    }
  },
  computed: {
    assetRules() {
      return [{
        deposit: 100,
        grant: 10
      }, {
        deposit: 1000,
        grant: 99
      }, {
        deposit: 99,
        grant: 1
      }, {
        deposit: 897,
        grant: 13
      }]
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

  .canvas-wrapper {
    text-align: center;
  }
  .home-block3 {
    .left {
      float: left;
      height: 40px;
      width: 80px;
      background: yellow;
    }
    .right {
      overflow: hidden;
      height: 50px;
      background: #ccc;
    }
  }
}
</style>