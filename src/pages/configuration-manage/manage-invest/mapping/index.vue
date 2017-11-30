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
        <i-form-item prop="name" label="资方名称" :label-width="80">
          <i-input type="text" placeholder="资方名称" v-model="searchForm.name"></i-input>
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
          prop="proName">
          <i-select v-model="formMapping.proName">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="欢乐颂">欢乐颂</i-option>
            <i-option value="任分期">任分期</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '资方不能为空', trigger: 'change'}"
          label="资方"
          prop="investName">
          <i-select v-model="formMapping.investName">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="海尔云贷">海尔云贷</i-option>
            <i-option value="海乐行融资租赁">海乐行融资租赁</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="资方产品编号"
          prop="investProNumber">
          <i-input v-model="formMapping.investProNumber"></i-input>
        </i-form-item>
        <i-form-item label="渠道编号" prop="channelNumber">
          <i-input v-model="formMapping.channelNumber"></i-input>
        </i-form-item>
        <i-form-item label="客户经理编号" prop="managerNumber">
          <i-input v-model="formMapping.managerNumber"></i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '贴息方式不能为空', trigger: 'change'}"
          label="贴息方式"
          prop="subsidy ">
          <i-select v-model="formMapping.subsidy ">
            <i-option value="">空值（测试用）</i-option>
            <i-option value="全贴">全贴</i-option>
            <i-option value="不贴">不贴</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '是否查询人行征信不能为空', trigger: 'change'}"
          label="是否查询人行征信"
          prop="isCredit">
          <i-select v-model="formMapping.isCredit">
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
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import ContractConf from './contract-configuration';
  export default {
    name: 'investMapping',
    mixins: [MixinData],
    components: {
      'bs-modal': BSModal,
      'modal-contract': ContractConf
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        ShowModel: false,         // 新增和修改弹窗
        ContractModel: false,      // 资方合同模板配置弹窗
        currentPage: 1,
        total: 0,
        searchForm: {
          name: '',
          currentPage: 1
        },
        formMapping: {
          proName: '',
          investName: '',
          investProNumber: '',
          channelNumber: '',
          managerNumber: '',
          isCredit: '',
          subsidy: ''
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
