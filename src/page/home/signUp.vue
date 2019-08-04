<template>
  <div class="signup-page">
    <div class="sign-filed">
      <div class="sign-filed_item">
        <span class="sign-filed_label">nick</span>
        <input class="sign-filed_input" type="text" v-model="name" />
      </div>
      <div class="sign-filed_item">
        <span class="sign-filed_label">password</span>
        <input class="sign-filed_input" type="password" v-model="password" />
      </div>
    </div>
    <div class="action">
      <mt-button @click="login">{{btnActionText}}</mt-button>
      <a @click="changeAction" class="action-text">{{actionText}}</a>
    </div>
  </div>
</template>

<script>
import Toast from '@client/component/Vue/mint/toast';
import Button from '@client/component/Vue/mint/button';
import superagent from 'superagent';

export default {
  data() {
    return {
      name: '',
      password: '',
      isSignUpState: true
    }
  },
  components: {
    'mt-button': Button
  },
  computed: {
    actionText() {
      return this.isSignUpState ? '有账号？去登录' : '无账号？去注册'
    },
    btnActionText() {
      return this.isSignUpState ? '注册' : '登录'
    }
  },
  created() {
  },
  methods: {
    changeAction() {
      this.isSignUpState = !this.isSignUpState;
    },
    login() {
      superagent
      .post('/api/signup', {name: this.name, password: this.password})
      .end((err, res) => {
        let body = res && res.body;
        if (body.code === 200) {
          Toast('注册成功');
          this.$router.push('/app/home');
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
.signup-page {
  box-sizing: border-box;
  height: 100vh;
  background: #0071c5;
  padding-top: 220px;
  .sign-filed {
    text-align: center;
    color: #fff;
    font-size: 16px;
    &_item {
      line-height: 60px;
    }
    &_label {
      display: inline-block;
      width: 80px;
      text-align: left;
      font-weight: 500;
    }
    &_input {
      appearance: none;
      line-height: 30px;
      width: 120px;
      border: 1px solid #dedede;
      border-radius: 3px;
    }
  }
  .action {
    margin-top: 20px;
    text-align: center;
    .mint-button {
      width: 120px;
    }
    &-text {
      font-size: 12px;
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>