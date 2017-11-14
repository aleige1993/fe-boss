<template>
  <div id="common-topnav">
    <div class="left-nav">
      <ul>
        <li><router-link :to="{ name: 'home' }">首页</router-link></li>
        <li><a href="#">贷款业务</a></li>
        <li><a href="#">合同管理</a></li>
        <li><a href="#">放款管理</a></li>
        <li><a href="#">财务管理</a></li>
        <li><a href="#">贷后管理</a></li>
        <li><router-link :to="{ name: 'product' }">产品管理</router-link></li>
        <li><a href="#">资方管理</a></li>
        <li><a href="#">商户管理</a></li>
        <li><a href="#">客户管理</a></li>
      </ul>
    </div>
    <div class="right-nav">

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
#common-topnav{
  height: 50px;
  box-shadow: 0 4px 4px #dddde0;
  background-color: #fff;
  padding: 10px 50px 0;
  position: fixed;
  width: 100%;
  top: 40px;
  z-index: 99;
  .left-nav{
    ul li{
      float: left;
      a{
        display: block;
        height: 40px;
        line-height: 40px;
        color: #2b333e;
        font-size: 14px;
        text-align: center;
        min-width: 97px;
        &:hover{
          background-color: $color-primary;
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
  .right-nav{

  }
}
</style>
