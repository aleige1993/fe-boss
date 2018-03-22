<template>
  <div id="app">
    <router-view/>
    <bs-over-loading :dataLoading="dataLoading"></bs-over-loading>
  </div>
</template>

<script>
  import OverLoading from '@/components/bs-over-loading';
export default {
  name: 'app',
  components: {
    'bs-over-loading': OverLoading
  },
  computed:{
    dataLoading(){
      return this.$store.state.dataLoadingShow;
    }
  },
  methods: {

  },
  created() {}
}
</script>

<style lang="scss">
/* @import "./assets/style/reset.scss";*/
/* @import "./assets/style/var.scss";*/
/* @import "./assets/style/common.scss";*/
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  .wraper{
    padding: 110px 15px 20px;
    &.no-action{
      padding-top: 10px;
      .ivu-breadcrumb{
        display: none;
      }
    }
  }
}
</style>
