<template>
  <div id="common-topnav">
    <div class="left-nav">
      <ul>
        <li><router-link :to="{ name: 'home' }">首页</router-link></li>
        <!--<li><router-link to="/index">主页</router-link></li>-->
        <li v-for="item in topMenuList" ><router-link :to="item.url" @click.native.prevent="openSecnodMenus(item)">{{item.text}}</router-link></li>
        <!--<li><a href="#">贷款业务</a></li>-->
        <!--<li><a href="#">合同管理</a></li>-->
        <!--<li><a href="#">放款管理</a></li>-->
        <!--<li><a href="#">财务管理</a></li>-->
        <!--<li><a href="#">贷后管理</a></li>-->
        <!--<li><router-link :to="{ name: 'manage-product' }">产品管理</router-link></li>-->
        <!--<li><a href="#">资方管理</a></li>-->
        <!--<li><a href="#">商户管理</a></li>-->
        <!--<li><a href="#">客户管理</a></li>-->
      </ul>
    </div>
    <div class="right-nav">

    </div>
  </div>
</template>
<script>
/* global bsWait */
export default {
  name: '',
  data() {
    return {};
  },
  computed: {
    topMenuList() {
      let allMenuList = this.$store.getters.menuList;
      let ary = [];
      allMenuList.map((item, index) => {
        ary.push({
          text: item.name,
          topMenuIndex: index,
          hasChildren: false,
          url: item.url
        });
      });
      return ary;
    }
  },
  methods: {
    openSecnodMenus(nav) {
      // let allMenuList = this.$store.getters.menuList;
      this.$store.dispatch('setSelectedTopMenuIndex', nav.topMenuIndex);
    }
  },
  async mounted() {
    let _vm = this;
    // await bsWait(1000);
    let count = 0;
    let domLoaded = function() {
      $('.left-nav li').each((index, ele) => {
        if ($(ele).find('a').is('.link-active')) {
          let _currIndex = $(ele).index();
          _vm.$store.dispatch('setSelectedTopMenuIndex', _currIndex - 1);
        }
      });
    };
    let interval = setInterval(() => {
      if (count > 1000) {
        domLoaded();
        clearInterval(interval);
      }
      count++;
      if (this.topMenuList.length > 0) {
        domLoaded();
        clearInterval(interval);
      }
    }, 0);
    // alert($('.left-nav li a.link-exact-active').size());
  }
};
</script>
<style lang="scss" scoped>
#common-topnav{
  min-width: 1200px;
  height: 50px;
  box-shadow: 0 4px 4px #dddde0;
  background-color: #fff;
  padding: 10px 10px 0;
  position: fixed;
  width: 100%;
  top: 40px;
  z-index: 99;
  .left-nav{
    ul li{
      float: left;
      margin: 0 10px;
      a{
        display: block;
        height: 40px;
        line-height: 40px;
        color: #2b333e;
        font-size: 14px;
        text-align: center;
        padding: 0 15px;
        &:hover,&.link-active{
          background-color: $color-primary;
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
  .right-nav{

  }
}
</style>
