<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>{{breadcrumbName}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      {{breadcrumbName}}
    </div>
    <div class="search-form-container">
      <i-form inline :model="searchForm" ref="loanSearchForm">
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
          <i-input v-model="searchForm.certNo" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="productNo">
          <i-select v-model="searchForm.productNo" type="text" placeholder="产品" style="width: 180px;">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <!--<i-form-item prop="orderNo">-->
          <!--<i-input v-model="searchForm.orderNo" type="text" placeholder="渠道业务编号"></i-input>-->
        <!--</i-form-item>-->
        <i-form-item prop="orderNo">
          <i-input v-model="searchForm.merchantAbbr" type="text" placeholder="经销商名称"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo">
          <i-input v-model="searchForm.channelName" type="text" placeholder="渠道商名称"></i-input>
        </i-form-item>
        <i-form-item prop="loanChannel">
          <i-select style="width: 120px;" v-model="searchForm.loanChannel" placeholder="来源渠道">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('BizChannelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="loanChannel" v-if="taskNode===''">
          <i-select style="width: 120px;" v-model="searchForm.taskNode" placeholder="任务节点">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('LoanBizNodeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="loanChannel" v-if="taskNode===''">
          <i-select style="width: 120px;" v-model="searchForm.status" placeholder="状态">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('BizStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <div style="display: inline-block">
          <i-form-item prop="applyStartTime">
            <bs-datepicker v-model="searchForm.applyStartTime" type="text" placeholder="申请时间"></bs-datepicker>
          </i-form-item>
          <i-form-item>
            -
          </i-form-item>
          <i-form-item prop="applyEndTime">
            <bs-datepicker v-model="searchForm.applyEndTime" type="text" placeholder="申请时间"></bs-datepicker>
          </i-form-item>
        </div>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight" :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'loanBusinessList',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        applyApproveLoading: false,
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
          'orderNo': '',
          'loanChannel': '',
          'applyStartTime': '',
          'applyEndTime': '',
          'taskNode': '',
          'status': '0;1;3',
          'merchantAbbr': '',
          'channelName': ''
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
      'taskNode': {
        type: String,
        default: '',
        required: false
      },
      'status': {
        type: String,
        default: '',
        required: false
      },
      'type': {
        type: String,
        default: 'page',
        required: false
      },
      'breadcrumbName': {
        type: String,
        default: '业务查询',
        required: false
      }
    },
    methods: {
      goToAdd() {
        this.$router.push('/index/customer/privatecustomer/modify');
      },
      async getProductList() {
        let resp = await this.$http.get('/pms/product/list', { productName: '', currentPage: 1, pageSize: 99999 });
        if (resp.success) {
          this.$data.productList = resp.body.resultList;
        }
      },
      async getPrivateCustomerLoanList(page, isFirstTimeGet = true) {
        let requestUrl = '/biz/listLoanBizByCon';
        if (this.taskNode === '1') {
          requestUrl = '/biz/listWaitLoanBizByCon';
        }
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        // 如果不是查询全部，就用指定的状态赋值
        if (this.taskNode !== '') {
          this.$data.searchForm.taskNode = this.taskNode;
        }
        if (isFirstTimeGet) {
          this.$data.searchForm.status = this.status;
        }
        let resp = await this.$http.post(requestUrl, {
          taskNode: '0;1',
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.privateCustomerLoanList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        }
      },
      jumpPage(page) {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.applyStartTime, this.$data.searchForm.applyEndTime)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getPrivateCustomerLoanList(page);
      },
      search() {
        if (!this.$DateTest.testDateFun(this.$data.searchForm.applyStartTime, this.$data.searchForm.applyEndTime)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getPrivateCustomerLoanList(1, false);
      },
      selectRow(row, index) {
        this.$router.push({
          path: '/index/loanbusiness/detail',
          query: {
            id: row.loanNo,
            status: row.taskNode,
            from: 'detail'
          }
        });
      }
    },
    watch: {
      'taskNode'() {
        this.$refs['loanSearchForm'].resetFields();
        this.$data.searchForm.taskNode = this.taskNode;
        this.$data.searchForm.status = this.status;
        this.getPrivateCustomerLoanList();
      }
    },
    mounted() {
      this.$refs['loanSearchForm'].resetFields();
      this.$data.searchForm.currentPage = 1;
      this.$data.searchForm.pageSize = 15;
      this.$data.searchForm.status = '0;1;3';
      this.getPrivateCustomerLoanList();
      this.getProductList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
    }
  };
</script>
<style lang="scss">
  .ivu-table-cell button[disabled] {
    display: none;
  }
</style>
