<template>
<!--资方映射配置-->
  <div id="invest-mapping">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方映射配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">查询条件</div>
    <div class="search-form-container">
      <i-form inline label-position="left" ref="searchForm" :model="searchForm">
        <i-form-item prop="capitalName" label="资方名称" :label-width="80">
          <i-input type="text" placeholder="资方名称" v-model="searchForm.capitalName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="search">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="junmpPage">
      </i-page>
    </div>
    <bs-modal :title="'资方映射配置'" v-model="ShowModel" :width="600">
      <i-form ref="formMapping" :model="formMapping" label-position="right" :label-width="150">
        <i-form-item
          :rules="{required: true, message: '产品不能为空', trigger: 'change'}"
          label="产品"
          prop="productName">
          <i-select v-model="formMapping.productName">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="欢乐颂">欢乐颂</i-option>
            <i-option value="任分期">任分期</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '资方不能为空', trigger: 'change'}"
          label="资方"
          prop="capitalName">
          <i-select v-model="formMapping.capitalName">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="海尔云贷">海尔云贷</i-option>
            <i-option value="海乐行融资租赁">海乐行融资租赁</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="资方产品编号"
          prop="capitalProductNo">
          <i-input v-model="formMapping.capitalProductNo"></i-input>
        </i-form-item>
        <i-form-item label="渠道编号" prop="channelNo">
          <i-input v-model="formMapping.channelNo"></i-input>
        </i-form-item>
        <i-form-item
          label="客户经理编号"
          prop="custMgrName">
          <input type="hidden" v-model="formMapping.custMgrNo"/>
          <i-input v-model="formMapping.custMgrNo" :readonly="true" placeholder="选择客户经理编号">
            <i-button @click="showSelectEmployer=!showSelectEmployer" slot="append">客户经理编号 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '贴息方式不能为空', trigger: 'change'}"
          label="贴息方式"
          prop="subsidytype">
          <i-select v-model="formMapping.subsidytype ">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="全贴">全贴</i-option>
            <i-option value="不贴">不贴</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '是否查询人行征信不能为空', trigger: 'change'}"
          label="是否查询人行征信"
          prop="ynCreditQuery">
          <i-select v-model="formMapping.ynCreditQuery">
            <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addformSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="addformCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <bs-modal :title="'资方合同模板配置'" v-model="ContractModel" :width="1200">
      <modal-contract v-if="ContractModel"></modal-contract>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import ContractConf from './contract-configuration';
  import TableEmployerList from '@/components/table-employer-list';
  export default {
    name: 'investMapping',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal,
      'modal-contract': ContractConf,
      'table-employer-list': TableEmployerList
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        ShowModel: false,         // 新增和修改弹窗
        ContractModel: false,      // 资方合同模板配置弹窗
        showSelectEmployer: false,      // 选择客户经理的弹窗
        currentPage: 1,
        total: 0,
        searchForm: {
          capitalName: '',
          currentPage: 1
        },
        formMapping: {
          productNo: '', // 产品编号
          productName: '', // 产品名称
          capitalNo: '', // 资方编号
          capitalName: '', // 资方名称
          capitalProductNo: '', // 资方产品编号
          channelNo: '', // 渠道编号
          custMgrNo: '', // 客户经理编号
          custMgrName: '', // 客户经理名称
          subsidytype: '',  // 贴息方式(1-全贴,2-全不贴)
          ynCreditQuery: ''  // 是否查询人行征信
        },
        ContractformData: {}     // 资方合同模板配置已选的数据
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      search() {
        this.getList();
      },
      junmpPage(page) {
        this.getList(page);
      },
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/mapping', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.data1 = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      // 新增按钮的弹窗
      addModal() {
        this.$data.ShowModel = true;
        const formName01 = 'formMapping';
        this.$refs[formName01].resetFields(); // 重置表单
      },
      // 新增里的 修改按钮
      setList(row) {
        this.isAdd = false;
        this.$data.ShowModel = true;
        this.formMapping.proName = row.proName;
        this.formMapping.investName = row.investName;
        this.formMapping.investProNumber = row.investProNumber;
        this.formMapping.channelNumber = row.channelNumber;
        this.formMapping.managerNumber = row.managerNumber;
      },
      // 新增里的 提交按钮
      addformSubmit() {
        this.$data.ShowModel = false;
      },
      // 新增里的 取消按钮
      addformCancel() {
        this.$data.ShowModel = false;
      },
      // 打开合同模板配置弹窗
      contractModelOpen() {
        this.$data.ContractModel = true;
      },
      // 选择客户经理
      selectEmployer(row, index) {
        this.$data.formMapping.custMgrNo = row.userCode;
        this.$data.formMapping.custMgrName = row.userName;
        this.$data.showSelectEmployer = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#invest-mapping {
  & .row-inline {
    &>.ivu-col {
      & span {
        width: 100%;
        display: inline-block;
        line-height: 34px;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
</style>
