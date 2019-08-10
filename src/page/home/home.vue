<template>
<div class="home">
  <div class="home-content">
    <div class="home-content_users">
      <div class="item" v-for="(item, idx) in users" :key="idx" @click="goChat(item)">
        <img :src="item.profile || defaultProfile" class="img" />
        <div class="right">
          <div class="name">{{item.name}}</div>
          <div class="msg">{{item.msg || '...'}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import superagent from 'superagent'
import Toast from '@client/component/Vue/mint/toast';

export default {
  data() {
    return {
      users: []
    }
  },
  computed: {
    defaultProfile() {
      return `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564931888461&di=4e095b77b7e16cab3c0516292caf116f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F585747cfd354024.jpg`
    }
  },
  activated() {
    this.getUsers();
  },
  methods: {
    goChat(user) {
      this.$router.push({
        path: '/app/home/chat',
        query: {
          toUserName: user.name,
        }
      })
    },
    getUsers() {
      superagent
        .get('/api/getusers')
        .end((err, res) => {
          let body = res && res.body || {};
          if (body.code === 200) {
            this.users = (body.data || []).filter(i => i.name !== window.user.name);
          } else {
            const errMsg = err && err.message || body.error;
            Toast(errMsg);
          }
        });
    },
  },
}
</script>

<style lang="less">
.home {
  &-content {
    padding: 15px 0;
    color: #333;
    font-size: 14px;
    padding: 0 15px;
    &_users {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .img {
          width: 40px;
          border-radius: 4px;
        }
        .right {
          flex: 1;
          margin-left: 10px;
          border-bottom: 1px solid #eee;
          .name {
            font-size: 18px;
            font-weight: 500;
            line-height: 2;
          }
          .msg {
            font-size: 12px;
            color: #999;
            line-height: 2;
          }
        }
      }
    }
  }
}
</style>