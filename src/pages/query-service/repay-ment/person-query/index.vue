<template>
  <div id="person-query">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/pages/query-service/repay-ment">业务查询</i-breadcrumb-item>
      <i-breadcrumb-item href="/pages/query-service/repay-ment">还款查询</i-breadcrumb-item>
      <i-breadcrumb-item>还款计划查询</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
        还款计划查询-已放款客户
    </div>
    <div class="search-form-container">
      <i-form inline :model="searchForm" ref="loanSearchForm">
        <i-form-item prop="loanNo">
          <i-input type="text" v-model="searchForm.loanNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="custName">
          <i-input v-model="searchForm.custName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item prop="certPhone">
          <i-input v-model="searchForm.certPhone" type="text" placeholder="客户电话"></i-input>
        </i-form-item>
        <i-form-item prop="productNo">
          <i-select v-model="searchForm.productNo" type="text" placeholder="产品名称" style="width: 180px;">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="statusNo">
          <i-select v-model="searchForm.statusNo" type="text" placeholder="贷款状态" style="width: 180px;">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="status in statusList" :value="status.statusNo" :key="status.statusNo">{{status.statusName}}</i-option>
          </i-select>
        </i-form-item>
        <div style="display: inline-block">
          <i-form-item prop="applyStartTime">
            <bs-datepicker v-model="searchForm.applyStartTime" type="text" placeholder="放款开始时间"></bs-datepicker>
          </i-form-item>
          <i-form-item>
            -
          </i-form-item>
          <i-form-item prop="applyEndTime">
            <bs-datepicker v-model="searchForm.applyEndTime" type="text" placeholder="放款结束时间"></bs-datepicker>
          </i-form-item>
        </div>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 查询</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight" :loading="dataLoading"   border ref="selection" :columns="CustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <<i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>

  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'personQuery',
    mixins: [MixinData],
    data() {
      return {
        total: 0,
        dataLoading: false,
        currentPage: 1,
        productList: [],
        statusList: [],
        repaytimeList: [],
        // privateCustomerLoanList: [],
        searchForm: {
          currentPage: 1,
          pageSize: 15,
          'loanNo': '',
          'custName': '',
          'certPhone': '',
          'productNo': '',
          'statusNo': '',
          'repayNo': '',
          'applyStartTime': '',
          'applyEndTime': ''
        }
      };
    },
    computed: {
    },
    props: {
    },
    methods: {
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      async getProductList() {
        let resp = await this.$http.get('/pms/product/list', { productName: '', currentPage: 1, pageSize: 99999 });
        if (resp.success) {
          this.$data.productList = resp.body.resultList;
        }
      },
      search() {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.applyStartTime, this.$data.searchForm.applyEndTime)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return false;
        }
      }
    },
    watch: {
    },
    mounted() {
      this.getProductList();
    }
  };
</script>
<style lang="scss">
  #page-credit-list {
    // display: none;
    .ivu-btn[disabled]{
      display: none !important;
    }
  }
</style>
