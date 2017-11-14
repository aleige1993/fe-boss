<template>
  <div id="page-login">
    <div class="top-bar">
      <div class="login-container">
        <i class="iconfont icon-logo1"></i>
      </div>
    </div>
    <div class="login-area">
      <div class="left-circle"></div>
      <div class="right-circle"></div>

      <div class="login-container relative">
        <div class="login-box">
          <div class="shadow"></div>
          <h1>登录</h1>
          <div class="login-form">
            <form>
              <div class="login-row">
                <label for="">用户名</label>
                <div class="login-input">
                  <input size="large" placeholder="用户名" v-model="loginForm.loginName"></input>
                </div>
              </div>
              <div class="login-row">
                <label for="">密码</label>
                <div class="login-input">
                  <input size="large" placeholder="密码" v-model="loginForm.loginPwd"></input>
                </div>
              </div>
              <div class="login-row">
                <label for="">验证码</label>
                <div class="login-input">
                  <input size="large" placeholder="验证码" v-model="loginForm.loginPwd" style="width: 232px;"></input>
                  <img class="verify-code" src="./img/code.png" alt="">
                </div>
              </div>
              <div class="login-row" style="padding-top: 10px;">
                <span class="text-danger" v-if="errorInfo"><Icon type="close-circled"></Icon> {{errorInfo}}</span>
              </div>
              <div class="login-row">
                <Button style="padding:10px 8px" type="primary" @click="submitLogin" size="large" long>登录</Button>
              </div>
              <div class="login-row text-center" style="padding-top: 10px;">
                <a href="#">忘记密码？</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'pageLogin',
  data() {
    return {
      loading: false,
      fromOtherPage: false,
      redirectUrl: '',
      errorInfo: '用户名或密码错误',
      loginForm: {
        loginName: 'test',
        loginPwd: '111111'
      }
    };
  },
  methods: {
    async submitLogin() {
      this.$data.loading = true;
      let loginResult = axios({
        url: '/login',
        dataType: 'json',
        data: this.$data.loginForm,
        method: 'POST'
      });
      this.$data.loading = false;
      // 登录成功
      if (loginResult.reCode === '0000') {
        this.$userLogin.setLoginInfo(loginResult.body);
        if (this.$data.fromOtherPage) {
          this.$router.push({
            name: this.$data.redirectUrl
          });
        } else {
          this.$router.push('/');
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.redirect_url) {
      this.$data.fromOtherPage = true;
      this.$data.redirectUrl = this.$route.query.redirect_url;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
