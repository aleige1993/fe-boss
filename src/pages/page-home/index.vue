<template>
  <div id="">
    <Row :gutter="16">
      <Col span="16">
        <Card>
         <p slot="title" class="card-title msg">今日新增进件数</p>
         <a href="#" slot="extra" @click.prevent="changeLimit">更多 <Icon type="ios-arrow-right"></Icon></a>
         <Row>
           <Col span="6" class="text-center">
              <circle-progress></circle-progress>
           </Col>
           <Col span="6" class="text-center">
             <div class="" id="secondCircle">
               <circle-progress></circle-progress>
             </div>
           </Col>
           <Col span="6" class="text-center">
             <circle-progress></circle-progress>
           </Col>
           <Col span="6" class="text-center">
             <circle-progress></circle-progress>
           </Col>
         </Row>
       </Card>
      </Col>
      <Col span="8">
        <Card>
         <p slot="title" class="card-title alert">我的消息</p>
         <a href="#" slot="extra" @click.prevent="changeLimit">更多 <Icon type="ios-arrow-right"></Icon></a>
         <ul>

         </ul>
       </Card>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="8">
        <Card>
         <p slot="title" class="card-title list">今日任务</p>
         <span slot="extra">今日还款成功数：120</span>
         <vue2-highcharts :options="todayDutyChartsOptions"></vue2-highcharts>
       </Card>
      </Col>
      <Col span="16">
        <Card>
         <p slot="title" class="card-title clock">我的代办</p>
         <a href="#" slot="extra" @click.prevent="changeLimit">更多 <Icon type="ios-arrow-right"></Icon></a>
         <ul>

         </ul>
       </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import VueHighcharts from 'vue2-highcharts';
import Solid from 'highcharts/modules/solid-gauge.js';
import Highcharts from 'highcharts';

import CircleProgress from '@/components/circle-progress';
// import {} from '@/assets/js/highcharts-more.js';
Solid(Highcharts);


import ChartOptions from './chartOptions';
export default {
  name: '',
  data() {
    return {
      Highcharts,
      id: 'circle-first',
      todayDutyChartsOptions: ChartOptions.todayDutyChartsOptions,
      circleProgressOptions: ChartOptions.circleProgressOptions
    }
  },
  components: {
    'vue2-highcharts': VueHighcharts,
    CircleProgress
  },
  mounted() {

  }
}
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
</style>
