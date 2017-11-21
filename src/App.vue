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
    async getEnumSelectData() {
      let response = await this.$http.post('/common/items', {});
      let data = response.body;
      let storeData = new Map();
      data.map(item => {
        storeData.set(item.groupKey, item.items);
      });
      // console.log(storeData);
      this.$store.dispatch('updateEnumSelectData', storeData);
    }
  },
  mounted() {
    this.getEnumSelectData();
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
