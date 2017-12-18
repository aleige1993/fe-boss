<template>
<!--渠道商管理-审核历史信息-->
  <div id="tableExamineHistory">
    <i-breadcrumb separator=">" v-if="$route.query.from==='detail'">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商授信额度审核历史</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <bs-form-block :title="'审核历史意见'">
      <i-table border :loading="dataLoading" ref="tableHistory" :columns="columns1" :data="data1"></i-table>
    </bs-form-block>
  </div>
</template>

<script>
  export default {
    name: 'tableExamineHistory',
    data() {
      return {
        dataLoading: false,
        columns1: [
          {
            title: '处理人',
            align: 'center',
            width: 200,
            key: 'processing'
          },
          {
            title: '任务节点',
            key: 'taskNode'
          },
          {
            title: '开始时间',
            key: 'timeStart'
          },
          {
            title: '结束时间',
            key: 'timeEnd'
          },
          {
            title: '耗时',
            key: 'timeLong'
          },
          {
            title: '结论',
            key: 'conclusion'
          },
          {
            title: '意见信息',
            key: 'opinion'
          }
        ],
        data1: [
          {
            'processing': '处理人01',
            'taskNode': '节点01',
            'timeStart': '2017-12-15 9:51',
            'timeEnd': '2017-12-15 10:00',
            'timeLong': '9:00',
            'conclusion': '结论01',
            'opinion': '意见01'
          }
        ]
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
