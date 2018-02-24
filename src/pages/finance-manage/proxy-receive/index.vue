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
          <i-input type="text" v-model="searchForm.projectNo" placeholder="项目编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.idHolder" type="text" placeholder="扣款人名称"></i-input>
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
      <i-button type="info" @click="massPayment">批量扣款</i-button>
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
        receiveNos: [] // 批量代扣ID
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
        this.getProxyPayList();
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
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
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
//        console.log(JSON.stringify(idArray));
        let resp = await this.$http.post('/pay/apply/receive', {
          receiveNos: idArray
        });
        if (resp.reCode === '0000') {
          this.$Message.success('扣款成功');
          this.getProxyPayList();
        }
      }
    },
    mounted() {
      this.getProxyPayList();
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
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
