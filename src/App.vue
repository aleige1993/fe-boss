<template>
  <div id="app">
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div class="wraper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Topbar from './pages/top-bar';
import Topnav from './pages/top-nav';
export default {
  name: 'app',
  components: {
    'top-bar': Topbar,
    'top-nav': Topnav
  }
}
</script>

<style lang="scss">
@import "./assets/style/reset.scss";
@import "./assets/style/var.scss";
@import "./assets/style/common.scss";

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
