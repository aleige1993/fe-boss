<template>
  <div id="page-home">
    <top-bar></top-bar>
    <top-nav></top-nav>
    <div class="wraper">
      <i-row :gutter="16">
        <i-col span="16">
          <i-card>
           <p slot="title" class="card-title msg">今日新增进件数</p>
           <a href="#" slot="extra">更多 <Icon type="ios-arrow-right"></Icon></a>
           <i-row>
             <i-col span="6" class="text-center">
                <circle-progress :options="{barColor: '#3abb9d', initValue: 80}" ref="firstCircle"></circle-progress>
                <div class="chart-number">
                  <p>微信: 400</p>
                  <p>占比:    40%</p>
                  <p>较上月:   10.8%</p>
                </div>
             </i-col>
             <i-col span="6" class="text-center">
               <div class="" id="secondCircle">
                 <circle-progress :options="{barColor: '#f6ba4a', initValue: 20}"></circle-progress>
                 <div class="chart-number">
                   <p>微信: 400</p>
                   <p>占比:    40%</p>
                   <p>较上月:   10.8%</p>
                 </div>
               </div>
             </i-col>
             <i-col span="6" class="text-center">
               <circle-progress :options="{barColor: '#e9573e', initValue: 50}"></circle-progress>
               <div class="chart-number">
                 <p>微信: 400</p>
                 <p>占比:    40%</p>
                 <p>较上月:   10.8%</p>
               </div>
             </i-col>
             <i-col span="6" class="text-center">
               <circle-progress :options="{barColor: '#eee', initValue: 90}"></circle-progress>
               <div class="chart-number">
                 <p>微信: 400</p>
                 <p>占比:    40%</p>
                 <p>较上月:   10.8%</p>
               </div>
             </i-col>
           </i-row>
         </i-card>
        </i-col>
        <i-col span="8">
          <i-card>
           <p slot="title" class="card-title alert">我的消息</p>
           <a href="#" slot="extra">更多 <Icon type="ios-arrow-right"></Icon></a>
           <div class="msg-list">
             <ul>
               <li><a href="#">您有10笔放款前提落实</a></li>
               <li><a href="#">您有10笔放款前提落实</a></li>
               <li><a href="#">您有10笔放款前提落实</a></li>
               <li><a href="#">您有10笔放款前提落实</a></li>
               <li><a href="#">您有10笔放款前提落实</a></li>
               <li><a href="#">您有10笔放款前提落实</a></li>
             </ul>
           </div>
         </i-card>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <i-col span="8">
          <i-card>
           <p slot="title" class="card-title list">今日任务</p>
           <span slot="extra">今日还款成功数：120</span>
           <vue2-highcharts :options="todayDutyChartsOptions" ref="paybackChart"></vue2-highcharts>
         </i-card>
        </i-col>
        <i-col span="16">
          <i-card>
           <p slot="title" class="card-title clock">我的代办</p>
           <a href="#" slot="extra">更多 <Icon type="ios-arrow-right"></Icon></a>
           <ul>

           </ul>
         </i-card>
        </i-col>
      </i-row>
    </div>
  </div>
</template>
<script>
import Topbar from '@/pages/common/top-bar';
import Topnav from '@/pages/common/top-nav';
import VueHighcharts from 'vue2-highcharts';
import CircleProgress from '@/components/circle-progress';
import PTModal from '@/components/bs-modal';
// import {} from '@/assets/js/highcharts-more.js';
import ChartOptions from './chartOptions';
export default {
  name: 'pageHome',
  data() {
    return {
      id: 'circle-first',
      username: '',
      todayDutyChartsOptions: ChartOptions.todayDutyChartsOptions,
      circleProgressOptions: ChartOptions.circleProgressOptions
    };
  },
  components: {
    'vue2-highcharts': VueHighcharts,
    CircleProgress,
    'pt-modal': PTModal,
    'top-bar': Topbar,
    'top-nav': Topnav
  },
  mounted() {
    document.body.style.backgroundColor = '#f3f3f3';
    this.initMenuTree();
  },
  beforeDestroy() {
    // do something before destroying vue instance
    document.body.style.backgroundColor = '#fff';
  },
  methods: {
    async initMenuTree() {
      let promise = await this.$http.get('/sys/menu/list?menuId=98');
      if (promise.reCode === '0000') {
        this.$store.dispatch('setMenuList', promise.body.childMenus);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .ivu-row{
    margin-bottom: 20px;
  }
  .card-title{
    padding-left: 22px;
    &.msg{
      background: url('./img/icon-msg.png') left center no-repeat;
    }
    &.alert{
      background: url('./img/icon-alert.png') left center no-repeat;
    }
    &.list{
      background: url('./img/icon-list.png') left center no-repeat;
    }
    &.clock{
      background: url('./img/icon-clock.png') left center no-repeat;
    }
  }
  .msg-list{
    padding: 10px 10px;
    ul{
      li{
        height: 34px;
        a{
          display: block;
          height: 34px;
          line-height: 34px;
          @include single-ellipsis;
        }
      }
    }
  }
  .chart-number{
    margin-top: 32px;
    p{
      margin-bottom: 14px;
      @include single-ellipsis;
      &:last-child{
        margin-bottom: 0
      }
    }
  }
</style>
