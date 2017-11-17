<template>
  <div id="left-nav">
    <h2>{{topMenuName}}</h2>
    <nav>
      <ul v-if="secondMenuList.length !== 0">
        <!-- <li><a href="#/form"><Icon v-bind:class="{active: isOpen}" type="ios-arrow-right"></Icon> 贷款业务</a></li> -->
        <li v-for="second in secondMenuList">

          <bs-collepse v-if="second.childMenus"  :title="second.name">
            <ul class="second-nav">
              <li v-for="thirdMenu in second.childMenus"><router-link :to="thirdMenu.url">{{thirdMenu.name || 'aaa'}}</router-link></li>
            </ul>
          </bs-collepse>
          <router-link v-else :to="second.url"><Icon v-bind:class="{active: isOpen}" type="ios-arrow-right"></Icon> {{second.name}}</router-link>
        </li>
        <!--<li>-->
          <!--<bs-collepse title="业务审批">-->
            <!--<ul class="second-nav">-->
              <!--<li><a href="#">电核初审</a></li>-->
              <!--<li><a href="#">有权审批</a></li>-->
            <!--</ul>-->
          <!--</bs-collepse>-->
        <!--</li>-->
      </ul>
    </nav>
  </div>
</template>
<script>
import BsCollepse from '@/components/bs-collepse';
export default {
  name: 'leftNav',
  data() {
    return {
      isOpen: false
    };
  },
  components: {
    BsCollepse
  },
  computed: {
    secondMenuList() {
      let currTopMenuIndex = this.$store.getters.selectedTopMenuIndex;
      let menuList = this.$store.getters.menuList;
      return menuList.length !== 0 ? menuList[currTopMenuIndex].childMenus : [];
    },
    topMenuName() {
      let currTopMenuIndex = this.$store.getters.selectedTopMenuIndex;
      let menuList = this.$store.getters.menuList;
      return menuList.length !== 0 ? menuList[currTopMenuIndex].name : ' ';
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#left-nav{
  width: 174px;
  float: left;
  background-color: #ecf4f8;
  min-height: 100px;
  padding: 10px 0;
  h2{
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    border-bottom: 1px solid #dcdfe1;
    padding: 0 20px 0 40px;

    background: url("./img/icon-list.png") 20px center no-repeat;

  }
  nav > ul > li{
    min-height: 32px;
    & > a{
      display: block;
      height: 32px;
      line-height: 32px;
      padding-left: 22px;
      font-size: 14px;
      border-left: 4px solid transparent;
      &:hover{
        color: #333;
        text-decoration: none;
      }
      &.active{
        background-color: #c5dcef;
        border-left: 4px solid $color-primary;
        color: $color-primary;
        &:before{
          transform: rotateX(90deg);
        }
      }
    }
  }
}
.second-nav{
  padding: 8px 0;
}
.second-nav > li > a{
  display: block;
  height: 32px;
  line-height: 32px;
  padding-left: 36px;
  border-left: 4px solid #ecf4f8;
  &.link-exact-active{
    background-color: #c5dcef;
    border-left: 4px solid $color-primary;
    color: $color-primary;
  }
}
</style>
