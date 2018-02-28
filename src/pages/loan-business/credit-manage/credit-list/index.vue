<template>
  <div id="page-credit-list">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信查询</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      授信列表
    </div>
    <div class="search-form-container">
      <i-form inline>
        <!--<i-form-item prop="user">
          <i-input type="text" v-model="searchForm.name" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.certNo" type="text" placeholder="主借人"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option v-for="item in certTypeEnum" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>-->
        <i-form-item>
          <i-input v-model="searchForm.companyName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item>
          <bs-datepicker v-model="searchForm.startDate" type="text" placeholder="申请时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          -
        </i-form-item>
        <i-form-item>
          <bs-datepicker v-model="searchForm.endDate" type="text" placeholder="申请时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          <i-select style="width: 120px;" v-model="searchForm.creditStatus" placeholder="授信状态">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('CreditAuditStatusEnum')" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="resultCustomerColumns" :data="privateCustomerList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'creditList',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        applyApproveLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          companyName: '',
          startDate: '',
          endDate: '',
          creditStatus: '',
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
      creditStatus: {
        type: String,
        default: '',
        required: false
      }
    },
    methods: {
      goToAdd() {
        this.$router.push('/index/customer/modify');
      },
      async getCompanyCreditList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
          this.$data.currentPage = page;
        }
        this.$data.searchForm.creditStatus = this.creditStatus || '';
        let resp = await this.$http.post('/credit/apply/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      jumpPage(page) {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.startDate, this.$data.searchForm.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getCompanyCreditList(page);
      },
      search() {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.startDate, this.$data.searchForm.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getCompanyCreditList(1);
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    },
    watch: {
      'creditStatus'(newVal) {
        this.getCompanyCreditList();
      }
    },
    mounted() {
      this.getCompanyCreditList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
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
