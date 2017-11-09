<template>
  <div id="">
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div class="wraper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Topbar from '@/pages/common/top-bar';
import Topnav from '@/pages/common/top-nav';
export default {
  name: '',
  data: () => ({

  }),
  components: {
    'top-bar': Topbar,
    'top-nav': Topnav
  }
};
</script>
<style lang="scss" scoped>
</style>
