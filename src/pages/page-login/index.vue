<template>
  <div id="page-login">
    <div class="login-box">
      <table>
        <tr v-if="fromOtherPage">
          <td></td>
          <td class="text-danger"><Icon type="information-circled"></Icon> 请登录</td>
        </tr>
        <tr>
          <td>用户名</td>
          <td><Input v-model="loginForm.username" placeholder="用户名" style="width: 280px"></Input></td>
        </tr>
        <tr>
          <td>密码</td>
          <td><Input v-model="loginForm.password" placeholder="密码" style="width: 280px"></Input></td>
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
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async submitLogin() {
      this.$data.loading = true;
      let loginResult = await this.$http.post('/login', this.$data.loginForm);
      // 登录成功
      if (loginResult.data.code === 0) {
        this.$userLogin.setLoginInfo(loginResult.data.data);
        this.$router.push({
          name: this.$data.redirectUrl
        });
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
</style>
