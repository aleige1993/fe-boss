<template>
  <div id="left-nav">
    <h2>贷款业务</h2>
    <nav>
      <ul>
        <!-- <li><a href="#/form"><Icon v-bind:class="{active: isOpen}" type="ios-arrow-right"></Icon> 贷款业务</a></li> -->
        <li>
          <bs-collepse title="业务受理">
            <ul class="second-nav">
              <li><a href="#">进单登记</a></li>
              <li><a href="#">进单查询</a></li>
              <li><a href="#">客户补件</a></li>
            </ul>
          </bs-collepse>
        </li>
        <li>
          <bs-collepse title="业务审批">
            <ul class="second-nav">
              <li><a href="#">电核初审</a></li>
              <li><a href="#">有权审批</a></li>
            </ul>
          </bs-collepse>
        </li>
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
  }
};
</script>
<style lang="scss" scoped>
#left-nav{
  width: 174px;
  float: left;
  background-color: #eee;
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
.second-nav > li > a{
  display: block;
  height: 26px;
  line-height: 26px;
}
</style>
