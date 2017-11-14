<template>
  <div id="common-topbar">
    <div class="logo">
      <i class="iconfont icon-logo"></i>
    </div>
    <div class="right-actions">
      <ul>
        <li><a href="#"><img class="top-avatar" src="./img/potrat.png" alt=""/>系统管理员</a></li>
        <li><a href="#"><i class="iconfont icon-xiugaimima"></i> <span>修改密码</span></a></li>
        <li><a href="javascript:;" @click.prevent="logout"><i class="iconfont icon-xiugaimima"></i> <span>退出登录</span></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    async logout() {
      let promise = await this.$http.get('/logout');
      if (promise.reCode === '0000') {
        this.$router.push('/login');
      } else {
        this.$Notice.error({
          title: '',
          desc: '系统繁忙，请稍后重试'
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#common-topbar{
  height: 40px;
  line-height: 40px;
  @include gradient-bg;
  padding: 0 50px;
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
    padding-top: 2px;
    .icon-logo{
      font-size: 22px;
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
