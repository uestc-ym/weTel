<template>
<div class="chatPage">
  <div class="content">
    <div :class="`item ${isSelfMsg(msg.from) ? 'right' : 'left'}`" v-for="(msg, idx) in messages" :key="idx">
      <img :src="msg.profile || defaultProfile" class="profile" />  
      <div class="msg">{{msg.content}}</div>
    </div>
  </div>
  <div style="height: 50px; padding-bottom: env(safe-area-inset-bottom);" />
  <div class="footer">
    <input v-model="inputMsg" class="input" />
    <span class="send" @click="sendMsg">发送</span>
  </div>
</div>
</template>

<script>
import superagent from 'superagent';
import Toast from '@client/component/Vue/mint/toast';
import io from 'socket.io-client';
 
let $chat;

export default {
  data() {
    return {
      inputMsg: '',
      messages: [],

    }
  },
  activated() {
    document.body.style.background = '#ddd';
    const name = this.toUserName;
    document.title = name;

    this.getMessages();
  },
  deactivated() {
    document.body.style.background = '#fff';
  },
  created() {
    $chat = io('http://localhost:3031/chat');

    $chat.on('getMsg', (res) => {
      let msg = res && res.msg || {};
      let isShouldReceiveMsg = (
        msg.from === this.userName && msg.to === this.toUserName
      ) || (
        msg.from === this.toUserName && msg.to === this.userName
      )
      if (!isShouldReceiveMsg) {
        return
      }

      if (res.code !== 200) {
        Toast('消息发送失败')
      } else {
        this.inputMsg = '';
        this.messages = this.messages.concat(res.msg);
      }
    })
  },
  computed: {
    userName() {
      return window.user.name
    },
    toUserName() {
      return this.$route.query.toUserName;
    },
    defaultProfile() {
      return `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564931888461&di=4e095b77b7e16cab3c0516292caf116f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F585747cfd354024.jpg`
    }
  },
  methods: {
    sendMsg() {
      let msg = {
        from: this.userName,
        to: this.toUserName,
        content: this.inputMsg,
        createdTime: +new Date(),
      }

      $chat.emit('sendMsg', msg);
    },
    isSelfMsg(name) {
      return name === this.userName
    },
    getMessages() {
      const query = {
        to: this.toUserName,
      }

      superagent
      .get('/api/getmessages', query)
      .end((err, res) => {
        let body = res && res.body;
        if (body.code === 200) {
          this.messages = body.data;
        } else {
          const errMsg = err && err.message || body.error;
          Toast(errMsg);
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.chatPage {
  height: 100vh;
  padding: 15px;
  padding-bottom: 50px;
  .content {
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .msg {
        position: relative;
        line-height: 40px;
        padding: 0 8px;
        border-radius: 3px;
        background: #fff;
        margin-left: 10px;
      }
      .profile {
        width: 32px;
        height: 32px;
        border-radius: 3px;
      }
      &.right {
        flex-direction: row-reverse;
        .msg {
          margin: 0 10px 0 0;
          background: #0071c5;
          color: #fff;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input {
      flex: 1;
      height: 30px;
      border: 0 none;
      border-radius: 3px;
      padding: 0 10px;
    }
    .send {
      margin-left: 10px;
    }
  }
}
</style>