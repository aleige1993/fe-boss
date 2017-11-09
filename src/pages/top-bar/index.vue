<template>
  <div id="common-topbar">
    <i class="iconfont icon-logo"></i>
    <div class="right-actions">
      <ul>
        <li><a href="#"><img class="top-avatar" src="./img/potrat.png" alt=""/>系统管理员</a></li>
        <li><a href="#"><i class="iconfont icon-xiugaimima"></i> <span>修改密码</span></a></li>
        <li><a href="#"><i class="iconfont icon-xiugaimima"></i> <span>退出登录</span></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
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
  .icon-logo{
    font-size: 20px;
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
