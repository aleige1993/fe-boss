<template>
  <div id="page-product">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>产品管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="name" label="产品名称" :label-width="100">
          <i-input type="text" placeholder="产品名称" v-model="formSearch.name"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
      <i-button @click="lilvClick" type="ghost"><i class="iconfont icon-shenhe"></i> 利率方案配置</i-button>
      <i-button @click="feiyClick" type="ghost"><i class="iconfont icon-shenhe"></i> 费用收取配置</i-button>
      <i-button @click="loanClick" type="ghost"><i class="iconfont icon-shenhe"></i> 贷款材料配置</i-button>
      <i-button @click="RuleClick"type="ghost"><i class="iconfont icon-shenhe"></i> 准入规则配置</i-button>
      <i-button @click="FileClick" type="ghost"><i class="iconfont icon-shenhe"></i> 归档材料配置</i-button>
      <i-button v-if="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table highlight-row border :loading="dataLoading" ref="proTable" :columns="columns1" :data="data1" @on-current-change="radioFun"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <!--新增产品弹窗-->
    <pt-modal title="添加产品" v-model="showAddModal" :width="600">
      <i-form ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item class="required" label="产品类别" prop="ProductTypeEnum">
          <i-select placeholder="请选择" v-model="formCustom.ProductTypeEnum">
            <!--
          {
          'groupKey': 'ProductTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '乘用车'
            },
            {
              'itemCode': '2',
              'itemName': '商用车'
            },
            {
              'itemCode': '3',
              'itemName': '轻卡'
            },
            {
              'itemCode': '4',
              'itemName': '微卡'
            },
            {
              'itemCode': '5',
              'itemName': '新能源'
            }
          ]
        }
          -->
            <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="产品名称" prop="proname">
          <i-input placeholder="请输入产品名称" v-model="formCustom.proname"></i-input>
        </i-form-item>
        <i-form-item label="状态" prop="state">
          <i-select v-model="formCustom.ProductStatusEnum">
            <!--{
              'groupKey': 'ProductStatusEnum',
              'items': [
                {'itemCode': '1','itemName': '启用'},
                {'itemCode': '2','itemName': '停用'}
              ]
            }-->
            <i-option v-for="item in enumSelectData.get('ProductStatusEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用流程" prop="process">
          <i-select v-model="formCustom.process">
            <i-option value="流程一">流程一</i-option>
            <i-option value="流程二">流程二</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="产品说明" prop="explain">
          <i-input v-model="formCustom.explain" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formReset('formCustom')">重置</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <!--利率方案配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']利率方案配置'" v-model="LlShowModel" :width="1200">
      <conf-model-lilv  @notice-lilv="noticeLilvFun"></conf-model-lilv>
    </pt-modal>
    <!--费用收取配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']费用收取配置'" v-model="FyShowModal" :width="1200">
      <conf-model-fy  @notice-cost="noticeCostFun"></conf-model-fy>
    </pt-modal>
    <!--贷款材料配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']贷款材料配置'" v-model="LoanShowModal" :width="1200">
      <conf-model-loan @notice-loan="noticeLoanFun"></conf-model-loan>
    </pt-modal>
    <!--准入规则配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']准入规则配置'" v-model="RuleShowModal" :width="1200">
      <conf-model-rule @notice-rule="noticeRuleFun"></conf-model-rule>
    </pt-modal>
    <!--归档材料配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']归档材料配置'" v-model="FileShowModal" :width="1200">
      <conf-model-file @notice-file="noticeFileFun"></conf-model-file>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import ConfModelLilv from './configure-model-lilv'; //  利率方案配置
  import ConfModelFy from './configure-model-cost'; //  费用收取配置
  import ConfModelLoan from './configure-model-loan'; //  贷款材料配置
  import ConfModelRule from './configure-model-rule'; //  准入规则配置
  import ConfModelFile from './configure-model-file'; //  准入规则配置
  export default {
    name: 'prolist',
    mixins: [MixinData],
    components: {
      'pt-modal': PTModal,
      'conf-model-lilv': ConfModelLilv,
      'conf-model-fy': ConfModelFy,
      'conf-model-loan': ConfModelLoan,
      'conf-model-rule': ConfModelRule,
      'conf-model-file': ConfModelFile
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        showAddModal: false,
        isClickRow: false,        // 是否已经选择了某一行
        LlShowModel: false,           // 利率方案配置弹窗
        FyShowModal: false,           // 费用收取配置弹窗
        LoanShowModal: false,         // 贷款材料配置弹窗
        RuleShowModal: false,         // 准入规则配置弹窗
        FileShowModal: false,         // 归档材料配置弹窗
        listIndex: Number,
        clickRow: {},
        total: 0,
        currentPage: 1,
        formSearch: {
          name: '',
          currentPage: 1,
          pageSize: 15
        },
        // 列表“新增按钮”的表单
        formCustom: {
          ProductTypeEnum: '',
          proname: '',
          ProductStatusEnum: '',
          process: '',
          explain: ''
        }
      };
    },
    methods: {
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.get('/product', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.data1 = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage() {
        this.getPrivateCustomerList();
      },
      search() {
        this.getPrivateCustomerList();
      },
      // 打开费用配置弹窗
      feiyClick() {
        if (this.clickRowedFun()) {
          this.$data.FyShowModal = true;
        }
      },
      // 打开贷款材料配置弹窗
      loanClick() {
        if (this.clickRowedFun()) {
          this.$data.LoanShowModal = true;
        }
      },
      // 打开准入规则配置弹窗
      RuleClick() {
        if (this.clickRowedFun()) {
          this.$data.RuleShowModal = true;
        }
      },
      // 打开归档材料配置弹窗
      FileClick() {
        if (this.clickRowedFun()) {
          this.$data.FileShowModal = true;
        }
      },
      // 利率配置弹窗传参
      noticeLilvFun() {
        this.$data.LlShowModel = false;
      },
      // 费用配置弹窗传参
      noticeCostFun() {
        this.$data.FyShowModal = false;
      },
      // 贷款材料配置弹窗传参
      noticeLoanFun() {
        this.$data.LoanShowModal = false;
      },
      // 准入规则配置弹窗传参
      noticeRuleFun() {
        this.$data.RuleShowModal = false;
      },
      // 归档材料配置弹窗传参
      noticeFileFun() {
        this.$data.FileShowModal = false;
      },
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.proname = row.proName;
        this.formCustom.protype = row.proType;
        this.formCustom.ProductStatusEnum = row.ProductStatusEnum;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            proNumber: '003',
            proName: this.$data.formCustom.proname,
            proType: this.$data.formCustom.protype,
            ProductStatusEnum: this.$data.formCustom.ProductStatusEnum,
            creationTime: 'yyyy-MM-dd HH:mm:ss',
            updateTime: this.getNowFormatDate()
          });
        } else {
          this.$data.data1[this.listIndex].proName = this.$data.formCustom.proname;
          this.$data.data1[this.listIndex].proType = this.$data.formCustom.protype;
          this.$data.data1[this.listIndex].ProductStatusEnum = this.$data.formCustom.ProductStatusEnum;
        }
        this.$data.showAddModal = false;
        this.formReset('formCustom');
      },
      formReset(name) {
        this.$refs[name].resetFields(); // 重置表单
      },
      // 单选每一行时出触发
      radioFun(currentRow, oldCurrentRow) {
        this.$data.clickRow = currentRow;
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$data.isClickRow = false;
        }
        this.$data.isClickRow = true;
      },
      // 取消选中行的选中状态
      handleClearCurrentRow() {
        this.$refs.proTable.clearCurrentRow();
        this.$data.isClickRow = false;
        this.$data.clickRow = {};
      },
      // 点击配置按钮时
      clickRowedFun() {
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$Notice.open({
            title: '请先选择需要配置的产品',
            duration: 2
          });
          return false;
        }
        return true;
      },
      // 打开利率配置弹窗
      lilvClick() {
        if (this.clickRowedFun()) {
          this.$data.LlShowModel = true;
        }
      }
    },
    mounted() {
      this.getPrivateCustomerList();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-product {
    & .form-top-actions {
      font-size: 0;
      & button {
        margin-right: 10px;
      }
    }
  }
</style>
