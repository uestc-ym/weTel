<template>
<div class="chatPage">
  <div class="content"></div>
</div>
</template>

<script>
import superagent from 'superagent';
import Toast from '@client/component/Vue/mint/toast';

export default {
  data() {
    return {
      messages: [],

    }
  },
  activated() {
    const name = this.userName;
    document.title = name;

    this.getMessages();
    this.socketInit();
  },
  computed: {
    userName() {
      return this.$route.query.userName;
    }
  },
  methods: {
    socketInit() {
      let chat = io.connect('http://localhost:3031/chat');
      let broadcast = io.connect('http://localhost:3031');

      broadcast.send('hi');

      broadcast.on('user connected', () => {
        console.log('server broadcast');
      })


      chat.on('userInfo', data => {
        console.log(data);
      })

      chat.emit('messagetoserver', 'hhahahhahaha');

      chat.on('messagetoclient', data => {
        console.log(data)
      })
    },
    getMessages() {
      const query = {
        to: this.userName,
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

<style lang="less">
.chatPage {
  .content {

  }
}
</style>