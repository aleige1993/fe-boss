<template>
  <div id="page-product">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>产品列表</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="productName" label="产品名称" :label-width="100">
          <i-input type="text" placeholder="产品名称" v-model="formSearch.productName"></i-input>
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
      <i-button @click="RuleClick" type="ghost"><i class="iconfont icon-shenhe"></i> 准入规则配置</i-button>
      <i-button @click="FileClick" type="ghost"><i class="iconfont icon-shenhe"></i> 归档材料配置</i-button>
      <i-button @click="ContractClick" type="ghost"><i class="iconfont icon-shenhe"></i> 合同模板配置</i-button>
      <i-button v-if="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table highlight-row border :loading="dataLoading" ref="proTable" :columns="columns1" :data="data1" @on-current-change="radioFun"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <!--新增产品弹窗-->
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="600">
      <i-form v-if="showAddModal" ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item
          :rules="{required: true, message: '产品类别不能为空', trigger: 'change'}"
          label="产品类别"
          prop="productType">
          <i-select placeholder="请选择" v-model="formCustom.productType">
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
            <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '产品名称不能为空', trigger: 'blur'}"
          label="产品名称"
          prop="productName">
          <i-input placeholder="请输入产品名称" v-model="formCustom.productName"></i-input>
        </i-form-item>
        <i-form-item label="状态" prop="status">
          <i-select v-model="formCustom.status">
            <!--{
              'groupKey': 'ProductStatusEnum',
              'items': [
                {'itemCode': '1','itemName': '启用'},
                {'itemCode': '2','itemName': '停用'}
              ]
            }-->
            <i-option v-for="item in enumSelectData.get('ProductStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用流程" prop="flowName">
          <i-select v-model="formCustom.flowName">
            <i-option value="1">流程一</i-option>
            <i-option value="2">流程二</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '产品说明不能为空', trigger: 'blur'}"
          label="产品说明"
          prop="remark">
          <i-input v-model="formCustom.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <!--利率方案配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']利率方案配置'" v-model="LlShowModel" :width="1200">
      <conf-model-lilv  @notice-lilv="noticeLilvFun" :child-msg="clickRow" v-if="LlShowModel"></conf-model-lilv>
    </pt-modal>
    <!--费用收取配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']费用收取配置'" v-model="FyShowModal" :width="1200">
      <conf-model-fy  @notice-cost="noticeCostFun" :child-msg="clickRow" v-if="FyShowModal"></conf-model-fy>
    </pt-modal>
    <!--贷款材料配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']贷款材料配置'" v-model="LoanShowModal" :width="1200">
      <conf-model-loan @notice-loan="noticeLoanFun" :child-msg="clickRow" v-if="LoanShowModal"></conf-model-loan>
    </pt-modal>
    <!--准入规则配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']准入规则配置'" v-model="RuleShowModal" :width="1200">
      <conf-model-rule @notice-rule="noticeRuleFun" :child-msg="clickRow" v-if="RuleShowModal"></conf-model-rule>
    </pt-modal>
    <!--归档材料配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']归档材料配置'" v-model="FileShowModal" :width="1200">
      <conf-model-file @notice-file="noticeFileFun" :child-msg="clickRow" v-if="FileShowModal"></conf-model-file>
    </pt-modal>
    <!--合同模板配置弹窗-->
    <pt-modal :title="'['+clickRow.productName+']合同模板配置'" v-model="ContractShowModal" :width="1200">
      <conf-model-contract @notice-file="noticeContractFun" :child-msg="clickRow" v-if="ContractShowModal"></conf-model-contract>
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
  import ConfModelContract from './configure-model-contract'; //  合同模板配置
  export default {
    name: 'prolist',
    mixins: [MixinData],
    components: {
      'pt-modal': PTModal,
      'conf-model-lilv': ConfModelLilv,
      'conf-model-fy': ConfModelFy,
      'conf-model-loan': ConfModelLoan,
      'conf-model-rule': ConfModelRule,
      'conf-model-file': ConfModelFile,
      'conf-model-contract': ConfModelContract
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        isClickRow: false,        // 是否已经选择了某一行
        LlShowModel: false,           // 利率方案配置弹窗
        FyShowModal: false,           // 费用收取配置弹窗
        LoanShowModal: false,         // 贷款材料配置弹窗
        RuleShowModal: false,         // 准入规则配置弹窗
        FileShowModal: false,         // 归档材料配置弹窗
        ContractShowModal: false,         // 合同模板配置弹窗
        listIndex: Number,
        clickRow: {},
        total: 0,
        pageSize: 10,
        currentPage: 1,
        formSearch: {
          productName: '',
          currentPage: 1,
          pageSize: 15
        },
        // 列表“新增按钮”的表单
        formCustom: {
          flowCode: '', // 适用流程编号
          remark: '', // 备注
          flowName: '', // 适用流程名称
          productNo: '', // 产品编号
          productName: '',  // 产品名称
          productType: '',  // 产品类型
          status: ''  // 产品状态
        }
      };
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.formSearch.currentPage = page;
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/product/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          productName: this.$data.formSearch.productName
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/product/save', {
          flowCode: this.$data.formCustom.flowCode,
          remark: this.$data.formCustom.remark,
          flowName: this.$data.formCustom.flowName,
          productType: this.$data.formCustom.productType,
          productName: this.$data.formCustom.productName,
          status: this.$data.formCustom.status
        });
        if (resAdd.success) {
          this.$data.buttonLoading = false; // 关闭按钮的loading状态
          this.$Message.success('新增产品成功');
          this.$data.showAddModal = false;
          this.$data.buttonLoading = false;
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      search() {
        this.getPrivateCustomerList();
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.showAddModal = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let resModify = await this.$http.post('/pms/product/modify', {
          flowCode: this.$data.formCustom.flowCode, // 适用流程编号
          remark: this.$data.formCustom.remark, // 备注
          flowName: this.$data.formCustom.flowName, // 适用流程名称
          productNo: this.$data.formCustom.productNo, // 产品编号
          productName: this.$data.formCustom.productName,  // 产品名称
          productType: this.$data.formCustom.productType,  // 产品类型
          status: this.$data.formCustom.status  // 产品状态
        });
        if (resModify.success) {
          this.$data.showAddModal = false;
          this.$data.buttonLoading = false;
          this.$Message.success('修改产品成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let productNo = row.productNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/product/remove', {
              productNo: productNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除产品成功');
              this.getPrivateCustomerList(1);
            }
          }
        });
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        let formName = 'formCustom';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.buttonLoading = true;
            // 如果是新增
            if (this.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 取消
      formCancel(name) {
        this.$data.showAddModal = false;
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
          this.$Notice.error({
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
      // 打开合同模板配置弹窗
      ContractClick() {
        if (this.clickRowedFun()) {
          this.$data.ContractShowModal = true;
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
      // 合同模板弹窗传参
      noticeContractFun() {
        this.$data.ContractShowModal = false;
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
