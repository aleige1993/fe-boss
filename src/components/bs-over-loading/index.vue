<template>
  <div id="">
    <div class="loading-shadow" v-show="dataLoading">
      <img src="./loader.gif" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'bsOverLoading',
  data() {
    return {

    };
  },
  props: ['dataLoading']
};
</script>
<style lang="scss" scoped>
.loading-shadow{
  background-color: rgba(255,255,255,0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  img{
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -64px;
    margin-top: -64px;
  }
}
</style>
