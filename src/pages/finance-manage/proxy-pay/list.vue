<template>
  <div id="page-table-demo">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="">
          <i-input type="text" v-model="searchForm.projectNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="productNo">
          <input type="hidden" v-model="searchForm.productName">
          <i-select v-model="searchForm.productNo" type="text" placeholder="产品名称" style="width: 180px;" :label-in-value="true" @on-change="productChange">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="">
          <i-input v-model="searchForm.custName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item prop="">
          <i-input v-model="searchForm.toAccName" type="text" placeholder="收款人姓名"></i-input>
        </i-form-item>
        <i-form-item prop="">
          <i-input v-model="searchForm.transCardId" type="text" placeholder="证件号码"></i-input>
        </i-form-item>

        <i-form-item prop="">
          创建时间
        </i-form-item>
        <i-form-item prop="">
          <bs-datepicker v-model="searchForm.btime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="">
          -
        </i-form-item>
        <i-form-item prop="">
          <bs-datepicker v-model="searchForm.etime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>

        <i-form-item prop="">
          付款完成时间
        </i-form-item>
        <i-form-item prop="">
          <bs-datepicker v-model="searchForm.btime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="">
          -
        </i-form-item>
        <i-form-item prop="">
          <bs-datepicker v-model="searchForm.etime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>

        <i-form-item prop="">
          <i-select style="width: 120px;" v-model="searchForm.state" placeholder="付款状态">
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
      <i-button v-if="!isDetail" type="info" @click="massPayment">批量付款</i-button>
      <i-button type="primary" @click="exportExcel" :loading="buttonLoading">
        <span v-if="!buttonLoading">导出EXCEL</span>
        <span v-else>Loading...</span>
      </i-button>
      <a style="display: none" ref="exportExcelRef" :href="exportExcelUrl">触发导出</a>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight - 20" border :loading="dataLoading" ref="selection" @on-select="selectRow" @on-select-all="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
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
          'productName': '',
          'custName': '',
          'toAccName': '',
          'transCardId': '',
          'btime': '',
          'etime': '',
          'state': '',
          'paymentType': '',
          'flag': '',
          currentPage: 1,
          pageSize: 15
        },
        productList: [],
        pay4Nos: [], // 批量代付ID
        exportExcelUrl: ''
      };
    },
    computed: {
      resultCustomerColumns() {
        if (this.isDetail) {
          return this.$data.customerColumns;
        } else {
          return [...this.$data.customerCheckboxColumns, ...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    },
    props: {
      paymentType: {
        type: String,
        default: '',
        required: false
      },
      flag: {
        type: String,
        default: '',
        required: false
      },
      isDetail: {
        type: Boolean,
        default: true,
        required: false
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
        this.$data.searchForm.paymentType = this.paymentType;
        this.$data.searchForm.flag = this.flag;
        let resp = await this.$http.post('/pay/payment', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        if (!this.isDetail) {
          resp.body.resultList.map(item => {
            if (!(item.state === '-1' || item.state === '3') || item.flag === '1') {
              item._disabled = true;
            }
            return item;
          });
        }
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      selectRow(selection, row) {
        this.pay4Nos = [];
        selection.map(item => {
          this.pay4Nos.push(item.payForNo);
        });
      },
      massPayment() {
        if (!this.pay4Nos.length) {
          this.$Notice.error({
            title: '错误提示',
            desc: '请先选择需付款项'
          });
        } else {
          this.submit(this.pay4Nos);
        }
      },
      async submit(idArray) {
        let resp = await this.$http.post('/pay/apply/payment', {
          pay4Nos: idArray
        });
        if (resp.reCode === '0000') {
          this.$Message.success('付款成功');
          this.getProxyPayList();
        }
      },
      async exportExcel() {
        this.$data.buttonLoading = true;
//        this.$data.searchForm.paymentType = this.paymentType;
//        this.$data.searchForm.flag = this.flag;
        let resp = await this.$http.post('/pay/payment/excel', this.$data.searchForm);
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$data.exportExcelUrl = resp.body;
          this.$nextTick(() => {
            this.$refs.exportExcelRef.click();
          });
        }
      }
    },
    watch: {
      'paymentType'(newVal) {
        this.getProxyPayList(1);
      }
    },
    mounted() {
//      alert(this.isDetail);
      this.getProductList();
      this.getProxyPayList();
      this.$data.certTypeEnum = [
        {
          'itemCode': '3',
          'itemName': '待付款'
        },
        {
          'itemCode': '0',
          'itemName': '付款中'
        },
        {
          'itemCode': '1',
          'itemName': '付款成功'
        },
        {
          'itemCode': '-1',
          'itemName': '付款失败'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
</style>
