<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>业务初审</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      业务列表
    </div>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.loanNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.custName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option v-for="item in certTypeEnum" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.certNo" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.applyStartTime" type="text" placeholder="申请时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          -
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.applyEndTime" type="text" placeholder="申请时间"></bs-datepicker>
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
    name: 'privateCustomer',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          currentPage: 1,
          pageSize: 15,
          'loanNo': '',
          'custNo': '',
          'custName': '',
          'corpName': '',
          'corpNo': '',
          'certType': '',
          'certNo': '',
          'productNo': '',
          'productName': '',
          'applyStartTime': '',
          'applyEndTime': '',
          'taskNode': '',
          'status': ''
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
      goToAdd() {
        this.$router.push('/index/customer/modify');
      },
      async getPrivateCustomerLoanList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/biz/listLoanBizByCon', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage(page) {
        this.getPrivateCustomerLoanList(page);
      },
      search() {
        this.getPrivateCustomerLoanList();
      },
      selectRow(row, index) {
        // this.$emit('on-row-dbclick', row, index);
      }
    },
    mounted() {
      this.getPrivateCustomerLoanList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
