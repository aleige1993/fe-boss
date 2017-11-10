<template>
  <div id="page-login">
    <!-- <div class="login-box">
      <table>
        <tr v-if="fromOtherPage">
          <td></td>
          <td class="text-danger"><Icon type="information-circled"></Icon> 请登录</td>
        </tr>
        <tr>
          <td>用户名</td>
          <td><Input v-model="loginForm.loginName" placeholder="用户名" style="width: 280px"></Input></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><Input v-model="loginForm.loginPwd" placeholder="密码" style="width: 280px"></Input></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Button type="primary" size="large" @click="submitLogin" style="width: 120px;">
              <span v-if="!loading">提交</span>
              <span v-else>Loading...</span>
            </Button>
          </td>
        </tr>
      </table>
    </div> -->
    <div class="top-bar">

    </div>
  </div>
</template>
<script>
export default {
  name: 'pageLogin',
  data() {
    return {
      loading: false,
      fromOtherPage: false,
      redirectUrl: '',
      loginForm: {
        loginName: 'test',
        loginPwd: '111111'
      }
    };
  },
  methods: {
    async submitLogin() {
      this.$data.loading = true;
      let loginResult = await this.$http.post('/login', this.$data.loginForm);
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
  .login-box{
    width: 400px;
    height: 300px;
    background-color: #f4f4f4;
    margin: 200px auto;
    padding:40px 20px;
    border-radius: 5px;
    td{
      padding: 10px 5px;
    }
  }
  .top-bar{
    height: 40px;
    background-color: #48a6f8;
    .main-container{
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
