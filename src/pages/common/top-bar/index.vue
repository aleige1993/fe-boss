<template>
  <div id="common-topbar">
    <div class="logo">
      <i class="iconfont icon-logo1"></i>
    </div>
    <div class="right-actions">
      <ul v-if="isLogin">
        <!--<li>
          <a href="javascript:;" @click="fullScreen"><Icon type="arrow-expand"></Icon></a>
        </li>-->
        <li><a href="javascript:;"><img class="top-avatar" src="./img/potrat.png" alt=""/>{{loginInfo.loginName}}</a></li>
        <li><router-link :to="{ name: 'resetPwd' }">
          <i class="iconfont icon-xiugaimima"></i> <span>修改密码</span></a>
        </router-link></li>
        <li><a href="javascript:;" @click.prevent="logout"><i class="iconfont icon-daochu1"></i> <span>退出登录</span></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Tools from '../../../utils/Tools';
export default {
  name: '',
  data() {
    return {
      showResetPwd: true
    };
  },
  computed: {
    loginInfo() {
      return this.$userLogin.getLoginInfo();
    },
    isLogin() {
      return this.$userLogin.isLogin();
    }
  },
  methods: {
    async logout() {
      let promise = await this.$http.get('/logout');
      if (promise.reCode === '0000') {
        this.$userLogin.removeLoginInfo();
        this.$router.push('/login');
      } else {
        this.$Notice.error({
          title: '错误提示',
          desc: '系统繁忙，请稍后重试'
        });
      }
    },
    fullScreen() {
      let app = document.getElementById('app');
      Tools.requestFullScreen(app);
    }
  }
};
</script>
<style lang="scss" scoped>
#common-topbar{
  height: 40px;
  line-height: 40px;
  @include gradient-bg;
  padding: 0 50px 0 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  color: #fff;
  .iconfont{
    line-height: 1;
  }
  .logo{
    float: left;
    height: 40px;
    padding-top: 2px;
    .icon-logo1{
      font-size: 32px;
      line-height: 40px;
    }
  }
  .right-actions{
    float: right;
    ul{
      li{
        float: left;
        a{
          padding: 0 11px;
          color: #fff;
          img.top-avatar{
            float: left;
            position: relative;
            top: 4px;
            font-size: 14px;
          }
          span{
            position: relative;
            top: -1px;
          }
        }
      }
    }
  }
}
</style>
