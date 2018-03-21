<template>
  <section>
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div class="welcome-body" id="welcome-body">
      <div class="welcome-main"></div>
    </div>
  </section>
</template>

<script>
  import TopBar from '@/pages/common/top-bar';
  import TopNav from '@/pages/common/top-nav';
  export default {
    name: 'welcome',
    data() {
      return {};
    },
    components: {
      TopBar,
      TopNav
    },
    mounted() {
      this.initMenuTree();
    }
  };
</script>

<style lang="scss" scoped>
  .welcome-body{
    position: absolute;
    left: 0;
    top: 110px;
    width: 100%;
    height: calc(100% - 110px);
    background:         linear-gradient(60deg, #0e7beb, #19a3f3);
    background: -webkit-linear-gradient(60deg, #0e7beb, #19a3f3);
    background:    -moz-linear-gradient(60deg, #0e7beb, #19a3f3);
    background:      -o-linear-gradient(60deg, #0e7beb, #19a3f3);
    .welcome-main{
      width: 50%;
      margin: 5% auto;
      height: 70%;
      background: url("../../../static/img/welcome.png") right center no-repeat;
      background-size: contain;
      color: #fff;
      padding-top: 157px;
      .welcome-left p{
        &:first-child{
          font-size: 64px;
          letter-spacing: 5px;
        }
        &:last-child{
          font-size: 26px;
          margin-top: 20px;
          letter-spacing: 5px;
        }
      }
    }
  }
</style>
