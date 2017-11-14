<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  }
}
</script>

<style lang="scss">
/*@import "./assets/style/reset.scss";*/
/*@import "./assets/style/var.scss";*/
/*@import "./assets/style/common.scss";*/
#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  .wraper{
    padding: 110px 50px 20px;
  }
}
</style>
