<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/financemanage">财务管理</i-breadcrumb-item>
      <i-breadcrumb-item>代付管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.projectNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.toAccName" type="text" placeholder="收款人名称"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.transCardId" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          预计放款时间
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.btime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          -
        </i-form-item>
        <i-form-item prop="password">
          <bs-datepicker v-model="searchForm.etime" type="text" placeholder="查询时间"></bs-datepicker>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.orderStat" placeholder="付款状态">
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
      <i-button type="info" @click="massPayment">批量付款</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" @on-select-all="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
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
          'toAccName': '',
          'transCardId': '',
          'btime': '',
          'etime': '',
          'status': '',
          currentPage: 1,
          pageSize: 15
        },
        pay4Nos: [] // 批量代付ID
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
        let resp = await this.$http.post('/pay/payment', this.$data.searchForm);
        // console.log(JSON.stringify(resp));
        this.$data.dataLoading = false;
        resp.body.resultList.map(item => {
          if (!(item.state === '-1' || item.state === '3') || item.flag === '1') {
            item._disabled = true;
          }
          return item;
        });
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
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
      }
    },
    mounted() {
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
