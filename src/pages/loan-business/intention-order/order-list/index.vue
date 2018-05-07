<template>
  <div id="customer-intention-order-list">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>APP订单列表</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      APP订单列表
    </div>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item>
          <i-input type="text" v-model="searchForm.orderNo" placeholder="订单编号"></i-input>
        </i-form-item>
        <i-form-item  >
         <i-input v-model="searchForm.RealName" type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item  >
          <i-select v-model="searchForm.productName" type="text" placeholder="产品" style="width: 180px;">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="product in productList" :value="product.productName" :key="product.productNo">{{product.productName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-select style="width: 120px;" v-model="searchForm.channelNo" placeholder="来源终端">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('BizChannelEnum')" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-select v-model="searchForm.orderStatus" type="text" placeholder="订单状态" style="width: 120px">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('MbOrderStatusEnum')" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <bs-datepicker v-model="searchForm.applyTimeStart" type="text" placeholder="下单时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          -
        </i-form-item>
        <i-form-item>
          <bs-datepicker v-model="searchForm.applyTimeEnd" type="text" placeholder="下单时间"></bs-datepicker>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+48" :loading="dataLoading" @on-row-dblclick="selectRow" size="small" border ref="selection" :columns="customerIntentionOrderListColumns" :data="customerIntentionOrderList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'intentionOrderList',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        productList: [],
        applyApproveLoading: false,
        searchForm: {
          currentPage: 1,
          pageSize: 15,
          'channelNo': '', // 渠道编号（1：Android；2：苹果；3：微信；4：其他）
          'orderStatus': '', // 订单状态
          'applyTimeStart': '',
          'applyTimeEnd': '',
          'productName': '', // 产品
          'RealName': '', // 客户名
          'orderNo': '' // 项目编号
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
    methods: {
      async getCustomerIntentionOrderList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        this.$data.searchForm.taskNode = this.taskNode;
        let resp = await this.$http.post('/loan/biz/listIntentionOrder', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.customerIntentionOrderList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      jumpPage(page) {
        this.getCustomerIntentionOrderList(page);
      },
      search() {
        this.getCustomerIntentionOrderList(1);
      },
      selectRow(row, index) {
        // this.$emit('on-row-dbclick', row, index);
      },
      async getProductList() {
        let resp = await this.$http.get('/pms/product/list', { productName: '', currentPage: 1, pageSize: 99999 });
        if (resp.success) {
          this.$data.productList = resp.body.resultList;
        }
      }
    },
    mounted() {
      this.getCustomerIntentionOrderList();
      this.getProductList();
    }
  };
</script>
<style lang="scss">
  .ivu-table-cell button[disabled] {
    display: none;
  }
</style>
