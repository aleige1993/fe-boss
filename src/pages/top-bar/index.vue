<template>
  <div id="common-topbar">
    <i class="iconfont icon-logo1"></i>
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
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#common-topbar{
  height: 40px;
  line-height: 40px;
  background: -moz-linear-gradient(left, #2b90f8, rgba(33, 166, 243, 1));
  background:         linear-gradient(left, #2b90f8, rgba(33, 166, 243, 1));
  background: -webkit-gradient(linear, 0 0, right bottom, from(#2b90f8), to(rgba(33, 166, 243, 1)));
  padding: 0 50px;
  color: #fff;
  .icon-logo1{
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
