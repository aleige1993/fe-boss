<template>
  <div id="page-index">
    <top-bar v-if="!noaction"></top-bar>
    <top-nav v-if="!noaction"></top-nav>
    <div class="wraper" v-bind:class="{'no-action': noaction}">
      <div id="" class="clearfix">
        <left-nav v-if="!noaction"></left-nav>
        <div class="right-main" v-bind:class="{'no-action': noaction}">
          <div class="scrollBarStyle">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Topbar from '@/pages/common/top-bar';
import Topnav from '@/pages/common/top-nav';
import LeftNav from '@/pages/common/left-nav';
export default {
  name: 'pageIndex',
  data: () => ({}),
  components: {
    'top-bar': Topbar,
    'top-nav': Topnav,
    LeftNav
  },
  computed: {
    noaction() {
      return this.$route.query.noaction;
    }
  },
  mounted() {
    this.initMenuTree();
  }
};
</script>
<style lang="scss" scoped>
</style>
