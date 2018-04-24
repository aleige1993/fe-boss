<template>
<!--抵押物代办列表-->
  <div id="pagePawnList">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/pawn">权证管理列表</i-breadcrumb-item>
      <i-breadcrumb-item v-if="status === '0'">权证待办列表</i-breadcrumb-item>
      <i-breadcrumb-item v-if="status === '2'">权证已办列表</i-breadcrumb-item>
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
        <i-form-item prop="productNo">
          <input type="hidden" v-model="searchForm.productName">
          <i-select v-model="searchForm.productNo" type="text" placeholder="产品名称" style="width: 180px;" :label-in-value="true" @on-change="productChange">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <!--<i-form-item prop="certType">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>-->
        <!--<i-form-item prop="certNo">-->
          <!--<i-input v-model="searchForm.certNo" type="text" placeholder="证件号码" style="width: 170px"></i-input>-->
        <!--</i-form-item>-->
        <i-form-item v-if="status === '0'" prop="surplusBackDays">
          <i-input v-model="searchForm.surplusBackDays" type="text" placeholder="剩余回传天数" style="width: 170px"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table :height="tableFixHeight+48" :loading="dataLoading" border ref="tableData" :columns="pawnColumns" :data="pawnData"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'pagePawnList',
    mixins: [MixinData],
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataLoading: false,
        searchForm: {
          'loanNo': '',
          'custName': '',
          'productName': '',
          'certNo': '',
          'surplusBackDays': '',
          'status': ''
        },
        productList: []
      };
    },
    props: {
      status: {
        type: String,
        default: '',
        required: true
      }
    },
    computed: {
      pawnColumns() {
        if (this.status === '0') {
          return [...this.$data.pawnBasicColumns, ...this.$data.pawnSurplusBackDaysColumns, ...this.$data.pawnActionColumns];
        } else {
          return [...this.$data.pawnBasicColumns, ...this.$data.pawnGmtModifiedColumns, ...this.$data.pawnActionColumns];
        }
      }
    },
    methods: {
      // 搜索框 产品条件变化时
      productChange(val) {
        if (val.value === '') {
          this.$data.searchForm.productName = '';
        } else {
          this.$data.searchForm.productName = val.label;
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
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        this.$data.searchForm.status = this.status;
        let resp = await this.$http.post('/biz/payment/pagePaymentWaitDonePawn', {
          ...this.$data.searchForm,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.pawnData = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.pawnData = [];
        }
      },
      search() {
        this.getList(1);
      },
      jumpPage(page) {
        this.getList(page);
      }
    },
    watch: {
      'status'(newVal) {
        this.getList();
      }
    },
    mounted() {
      if (this.$route.query.currentPage) {
        this.$data.currentPag = this.$route.query.currentPag / 1;
      }
      this.getProductList();
      this.getList();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
