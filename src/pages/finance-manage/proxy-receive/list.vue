<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/financemanage">财务管理</i-breadcrumb-item>
      <i-breadcrumb-item>代扣管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline ref="searchForm" :model="searchForm">
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.projectNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="productNo">
          <input type="hidden" v-model="searchForm.receiveProduct">
          <i-select v-model="searchForm.productNo" type="text" placeholder="产品名称" style="width: 180px;" :label-in-value="true" @on-change="productChange">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.idHolder" type="text" placeholder="扣款人姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.idCard" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          扣款发起时间
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.receiveSTime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          -
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.receiveETime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.orderStat" placeholder="扣款状态">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in certTypeEnum" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions" slot="topAction">
      <i-button v-if="!isDetail" type="info" @click="massPayment">批量扣款</i-button>
      <i-button type="primary" @click="exportExcel" :loading="buttonLoading">
        <span v-if="!buttonLoading">导出EXCEL</span>
        <span v-else>Loading...</span>
      </i-button>
      <a style="display: none" ref="exportExcelRef" :href="exportExcelUrl">触发导出</a>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight-20" border :loading="dataLoading" ref="selection" @on-select="selectRow" @on-select-all="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
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
        buttonLoading: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          'projectNo': '',
          'receiveProduct': '',
          'idHolder': '',
          'idCard': '',
          'receiveSTime': '',
          'receiveETime': '',
          'orderStat': '',
          currentPage: 1,
          pageSize: 15
        },
        productList: [],
        receiveNos: [], // 批量代扣ID
        exportExcelUrl: ''
      };
    },
    computed: {
      resultCustomerColumns() {
        if (this.isDetail) {
          return [...this.$data.customerColumns, ...this.$data.customerRemarkColumns];
        } else {
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns, ...this.$data.customerRemarkColumns];
        }
      }
    },
    props: {
      isDetail: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    methods: {
      // 搜索框 产品条件变化时
      productChange(val) {
        if (val.value === '') {
          this.$data.searchForm.receiveProduct = '';
        } else {
          this.$data.searchForm.receiveProduct = val.label;
        }
      },
      /*
      * 获取产品列表 下拉
       */
      async getProductList() {
        let resp = await this.$http.get('/pms/product/list', { productName: '', currentPage: 1, pageSize: 99999 });
        if (resp.success) {
          this.$data.productList = resp.body.resultList;
        } else {
          this.$data.productList = [];
        }
      },
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      search() {
        this.getProxyPayList(1);
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/pay/receive', this.$data.searchForm);
        this.$data.dataLoading = false;
        resp.body.resultList.map(item => {
          if (!(item.orderStat === 'F' || item.orderStat === 'D')) {
            item._disabled = true;
          }
          return item;
        });
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      selectRow(selection, row) {
        this.receiveNos = [];
        selection.map(item => {
          this.receiveNos.push(item.receiveNo + '');
        });
      },
      massPayment() {
        if (!this.receiveNos.length) {
          this.$Notice.error({
            title: '错误提示',
            desc: '请先选择需扣款项'
          });
        } else {
          this.submit(this.receiveNos);
        }
      },
      async submit(idArray) {
        let resp = await this.$http.post('/pay/apply/receive', {
          receiveNos: idArray
        });
        if (resp.reCode === '0000') {
          this.$Message.success('扣款请求成功');
          this.getProxyPayList();
        }
      },
      async exportExcel() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('/pay/receive/excel', this.$data.searchForm);
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$data.exportExcelUrl = resp.body;
          this.$nextTick(() => {
            this.$refs.exportExcelRef.click();
          });
        }
      },
      initSearchOption() {
        this.$data.searchForm = {};
        if (this.isDetail) {
          this.$data.searchForm.orderStat = 'F';
        }
      }
    },
    watch: {
      '$route'() {
        this.initSearchOption();
        this.getProxyPayList();
      }
    },
    mounted() {
      this.$data.certTypeEnum = [
        {
          'itemCode': 'D',
          'itemName': '待扣款'
        },
        {
          'itemCode': 'I',
          'itemName': '扣款中'
        },
        {
          'itemCode': 'S',
          'itemName': '扣款成功'
        },
        {
          'itemCode': 'F',
          'itemName': '扣款失败'
        }
      ];
      this.initSearchOption();
      this.getProductList();
      this.getProxyPayList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
