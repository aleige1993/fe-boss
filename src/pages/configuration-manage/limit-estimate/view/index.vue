<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/limitestimate">额度预估</i-breadcrumb-item>
      <i-breadcrumb-item>设置预览</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="scrollBarStyle" :style="{overflowY:'auto',border:'1px solid #ddd',maxHeight:(tableFixHeight+200)+'px'}">
      <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 0px;">
        <tr>
          <th>一级指标</th>
          <th>二级指标</th>
          <th>满分</th>
          <th>评分标准</th>
          <th>所占百分比</th>
        </tr>
        <template v-for="list in resultList">
          <tr>
            <td :rowspan="list.memberScoreDTOList.length + 1">{{list.firstLevelTarget}}</td>
            <td :rowspan="list.memberScoreDTOList.length + 1">{{list.secondLevelTarget}}</td>
            <td :rowspan="list.memberScoreDTOList.length + 1">{{list.score}}</td>
          </tr>
          <tr v-for="itemList in list.memberScoreDTOList">
            <td>{{itemList.scoreName}}</td>
            <td>{{itemList.scoreRatio * 100}}%</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bannerManage',
    data() {
      return {
        resultList: []
      };
    },
    methods: {
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/qualificationAssess/listAllTargetWithScore');
        this.$data.resultList = resp.body;
      }
    },
    mounted() {
      this.getProxyPayList();
    }
  };
</script>
<style lang="scss" scoped>
  table {
    width: 100%;
    margin-top: 15px;
    text-align: center;
    border-left: 1px solid #e9eaec;
    border-top: 1px solid #e9eaec;
    th, td {
      height: 34px;
      line-height: 34px;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
    }
    th {
      background: #f8f8f9;
    }
    /*td {*/
      /*padding-left: 10px;*/
    /*}*/
  }
</style>
