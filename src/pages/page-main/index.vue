<template>
  <div id="page-index">
    <top-bar v-if="!noaction"></top-bar>
    <top-nav v-if="!noaction"></top-nav>
    <div class="wraper" v-bind:class="{'no-action': noaction}">
      <div id="" class="clearfix">
        <left-nav v-if="!noaction"></left-nav>
        <div class="right-main" v-bind:class="{'no-action': noaction}">
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
  methods: {
    async initMenuTree() {
      const msg = this.$Message.loading({
        content: '正在初始化菜单',
        duration: 0
      });
      let promise = await this.$http.get('/sys/menu/list?menuId=98');
      msg();
      if (promise.reCode === '0000') {
        this.$store.dispatch('setMenuList', promise.body.childMenus);
      }
    }
  },
  mounted() {
    this.initMenuTree();
  }
};
</script>
<style lang="scss" scoped>
</style>
