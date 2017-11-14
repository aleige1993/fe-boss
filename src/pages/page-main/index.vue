<template>
  <div id="page-index">
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div class="wraper">
      <div id="" class="clearfix">
        <left-nav></left-nav>
        <div class="right-main">
          <router-view></router-view>
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
  data: () => ({

  }),
  components: {
    'top-bar': Topbar,
    'top-nav': Topnav,
    LeftNav
  }
};
</script>
<style lang="scss" scoped>
</style>
