<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/financemanage">财务管理</i-breadcrumb-item>
      <i-breadcrumb-item>代扣管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input v-model="searchForm.projectNo" type="text" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.idHolder" type="text" placeholder="扣款人姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.transSerialNo" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          扣款发起时间
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.applyStartTime" type="text" placeholder="选择时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          -
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.applyEndTime" type="text" placeholder="选择时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="扣款状态">
            <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'proxyPayList',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          'projectNo': '',
          'transId': '',
          'transSerialNo': '',
          'bankName': '',
          'idHolder': '',
          currentPage: 1,
          pageSize: 15
        }
      };
    },
    computed: {
      resultCustomerColumns() {
        if (this.type === 'modal') {
          return this.$data.customerColumns;
        } else {
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    methods: {
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/pay/payment', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      search() {
        this.getProxyPayList();
      },
      selectRow(row, index) {
        // this.$emit('on-row-dbclick', row, index);
      },
      async payment(idArray) {
        let resp = await this.$http.post('/pay/apply/payment', {
          pay4Nos: idArray
        });
        if (resp.messageFault.reCode === '0000') {
          this.$Message.success('付款成功');
          this.getProxyPayList();
        }
      }
    },
    mounted() {
      this.getProxyPayList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
