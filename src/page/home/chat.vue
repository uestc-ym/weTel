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
  },
  computed: {
    userName() {
      return this.$route.query.userName;
    }
  },
  methods: {
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