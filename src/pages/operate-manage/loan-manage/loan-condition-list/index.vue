<template>
<!--放款申请列表-->
  <div id="page-loan-condition-list">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/loan">放款管理</i-breadcrumb-item>
      <i-breadcrumb-item>放款条件落实</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline ref="searchForm" :model="searchForm">
        <i-form-item prop="loanNo">
          <i-input type="text" v-model="searchForm.loanNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="custName">
          <i-input v-model="searchForm.custName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item prop="certType">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="certNo">
          <i-input v-model="searchForm.certNo" type="text" placeholder="证件号码" style="width: 170px"></i-input>
        </i-form-item>
        <i-form-item prop="startDate">
          <bs-datepicker v-model="searchForm.startDate" type="text" placeholder="申请时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          -
        </i-form-item>
        <i-form-item prop="endDate">
          <bs-datepicker v-model="searchForm.endDate" type="text" placeholder="申请时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table :height="tableFixHeight+48" :loading="dataLoading" border ref="tableData" :columns="conditionListColumns" :data="conditionListData"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'pageloanConditionList',
    mixins: [MixinData],
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataLoading: false,
        clickRow: {},
        searchForm: {
          'loanNo': '',
          'custName': '',
          'certType': '',
          'certNo': '',
          'startDate': '',
          'endDate': ''
        }
      };
    },
    mounted() {
      if (this.$route.query.currentPage) {
        this.$data.currentPag = this.$route.query.currentPage / 1;
      }
      this.getList();
    },
    methods: {
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('/biz/payment/pagePaymentApplyRecord', {
          taskNode: '9',
          status: '0;1',
          ...this.$data.searchForm,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.resultList) {
          this.$data.conditionListData = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = parseFloat(resp.body.totalNum);
        } else {
          this.$data.conditionListData = [];
        }
      },
      search() {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.startDate, this.$data.searchForm.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getList(1);
      },
      jumpPage(page) {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.startDate, this.$data.searchForm.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getList(page);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
