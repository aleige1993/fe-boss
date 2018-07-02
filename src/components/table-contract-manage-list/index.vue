<template>
  <!--待制作合同列表-->
  <div id="contractMaking">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/contract">合同管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="this.taskNode==='6'">待制作合同列表</i-breadcrumb-item>
      <i-breadcrumb-item v-if="this.taskNode==='8'">
        {{succeed?'已签署合同':'待签署合同'}}{{query?'查询':'列表'}}
      </i-breadcrumb-item>
    </i-breadcrumb>
    <i-row>
      <i-col span="24">
        <div class="search-form-container">
          <i-form inline ref="formSearch" :model="formSearch" label-position="right">
            <i-form-item prop="loanNo" style="margin-right:20px;">
              <i-input type="text" placeholder="项目编号" v-model="formSearch.loanNo"></i-input>
            </i-form-item>
            <i-form-item prop="custName" style="margin-right:20px;">
              <i-input type="text" placeholder="客户名称" v-model="formSearch.custName"></i-input>
            </i-form-item>
            <i-form-item prop="productNo">
              <input type="hidden" v-model="formSearch.productName">
              <i-select v-model="formSearch.productNo" type="text" placeholder="产品名称" style="width: 180px;" :label-in-value="true" @on-change="productChange">
                <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
                <i-option v-for="product in productList" :value="product.productNo" :key="product.productNo">{{product.productName}}</i-option>
              </i-select>
            </i-form-item>
            <i-form-item prop="certType" style="margin-right:20px;">
              <i-select v-model="formSearch.certType" style="width:150px" placeholder="证件类型">
                <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
                <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
            <i-form-item prop="certNo" style="margin-right:20px;">
              <i-input  v-model="formSearch.certNo" placeholder="证件号码"></i-input>
            </i-form-item>
            <i-form-item prop="startDate" style="width: 120px;margin-right: 0px">
              <bs-datepicker v-model="formSearch.startDate" type="text" placeholder="申请时间"></bs-datepicker>
            </i-form-item>
            <i-form-item style="margin-left:5px;margin-right: 5px">-</i-form-item>
            <i-form-item prop="endDate" style="width: 120px">
              <bs-datepicker v-model="formSearch.endDate" type="text" placeholder="申请时间"></bs-datepicker>
            </i-form-item>
            <!--<i-form-item v-if="taskNode === '8' && !succeed" prop="certType">-->
              <!--<i-select v-model="formSearch.hasSign" style="width:150px" placeholder="线上签约状态">-->
                <!--<i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>-->
                <!--<i-option value="1">已完成</i-option>-->
                <!--<i-option value="2">未完成</i-option>-->
              <!--</i-select>-->
            <!--</i-form-item>-->
            <i-form-item style="margin-left:20px;">
              <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :height="tableFixHeight+58" border :loading="dataLoading" ref="contractTable" :columns="tableColumns" :data="data1"></i-table>
        <div class="page-container">
          <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'contractMaking',
    mixins: [MixinData],
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataLoading: false,
        statusData: '0;1',
        columns: [],
        clickRow: {},
        productList: [],
        formSearch: {
          loanNo: '',
          custName: '',
          productNo: '',
          productName: '',
          certType: '',
          certNo: '',
          startDate: '',
          endDate: ''
        }
      };
    },
    computed: {
      tableColumns() {
        if (this.taskNode === '8' && !this.succeed) {
          this.$data.columns = [...this.$data.columnsHasSign, ...this.$data.columns1];
        } else {
          this.$data.columns = this.$data.columns1;
        }
        if (!this.query) {
          this.$data.columns = [...this.$data.columns, ...this.$data.columnsAction];
        }
        return this.$data.columns;
      }
    },
    props: {
      taskNode: {
        type: String,
        required: true,
        default: '6'
      },
      status: {
        type: String,
        required: true,
        default: '0;1'
      },
      succeed: {
        type: Boolean,
        required: false,
        default: false
      },
      query: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    watch: {
      'succeed'() {
        this.initFun();
      },
      'query'() {
        this.initFun();
      }
    },
    mounted() {
      this.getProductList(); // 获取产品列表 下拉
      this.initFun();
    },
    methods: {
      // 搜索框 产品条件变化时
      productChange(val) {
        if (val.value === '') {
          this.$data.formSearch.productName = '';
        } else {
          this.$data.formSearch.productName = val.label;
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
      async initFun() {
        this.$refs['formSearch'].resetFields();
        if (this.$route.query.currentPage) {
          this.$data.currentPage = this.$route.query.currentPage / 1;
        }
        if (this.succeed) {
          this.$data.statusData = '2';
        } else {
          this.$data.statusData = this.status;
        }
        await this.getList();
      },
      // 设置当前处理人
//      async settingHandleUser(row) {
//        let resp = await this.$http.post('/biz/sign/settingHandleUser', {
//          signNo: row.signNo
//        });
//        if (resp.success) {
//          return true;
//        } else {
//          return false;
//        }
//        return true;
//      },
      // 查询列表数据
      async getList(page) {
        if (page) {
          this.$data.currentPage = page;
        }
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/biz/sign/page', {
          status: this.$data.statusData,
          taskNode: this.taskNode,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          ...this.$data.formSearch
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        if (!this.$DateTest.testDateFun(this.$data.formSearch.startDate, this.$data.formSearch.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getList(page);
      },
      search() {
        if (!this.$DateTest.testDateFun(this.$data.formSearch.startDate, this.$data.formSearch.endDate)) {
          this.$Message.error('“开始日期”不能大于“结束日期”');
          return;
        }
        this.getList(1);
      },
      // 打开合同制作模态框
      openMakingModal(row) {
        // 跳转到合同 制作 审批详情页面
        if (this.taskNode === '6') {
          this.$router.push({
            path: '/index/contract/making',
            query: {
              currentPage: this.$data.currentPage,
              taskNode: this.taskNode,
              loanNo: row.loanNo, // 项目编号（业务申请编号）
              signNo: row.signNo, // 签约编号
              custName: row.custName // 客户名称
            }
          });
        }
        // 跳转到合同 签署确认 审批详情页面
        if (this.taskNode === '8') {
          this.$router.push({
            path: '/index/contract/signDetails',
            query: {
              currentPage: this.$data.currentPage,
              taskNode: this.taskNode,
              loanNo: row.loanNo, // 项目编号（业务申请编号）
              signNo: row.signNo, // 签约编号
              isDetails: this.succeed
            }
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
