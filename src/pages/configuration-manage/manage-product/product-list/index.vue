<template>
  <div id="page-product">
    <i-breadcrumb separator="&gt;" v-if="!isModal">
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
    <div class="form-top-actions" slot="topAction" v-if="!isModal">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
      <i-button @click="lilvClick" type="ghost"><i class="iconfont icon-shenhe"></i> 利率方案配置</i-button>
      <i-button @click="feiyClick" type="ghost"><i class="iconfont icon-shenhe"></i> 费用收取配置</i-button>
      <i-button @click="loanClick" type="ghost"><i class="iconfont icon-shenhe"></i> 贷款材料配置</i-button>
      <i-button @click="lendingClick" type="ghost"><i class="iconfont icon-shenhe"></i> 放款条件配置</i-button>
      <i-button @click="RuleClick" type="ghost"><i class="iconfont icon-shenhe"></i> 准入规则配置</i-button>
      <i-button @click="FileClick" type="ghost"><i class="iconfont icon-shenhe"></i> 归档材料配置</i-button>
      <i-button @click="ContractClick" type="ghost"><i class="iconfont icon-shenhe"></i> 合同模板配置</i-button>
      <i-button v-show="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table highlight-row border :loading="dataLoading" ref="proTable" :columns="resultColumns" :data="data1" @on-current-change="radioFun" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <!--新增产品弹窗-->
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="1000">
      <i-form v-if="showAddModal" ref="formCustom" :model="formCustom" label-position="right" :label-width="100">
        <i-row>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '产品名称不能为空', trigger: 'blur'}"
              label="产品名称"
              prop="productName">
              <i-input placeholder="请输入产品名称" v-model="formCustom.productName"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '产品别名不能为空', trigger: 'blur'}"
              label="产品别名"
              prop="productAlias">
              <i-input placeholder="请输入产品别名" v-model="formCustom.productAlias"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '产品类型不能为空', trigger: 'change'}"
              label="产品类型"
              prop="productType">
              <i-select placeholder="请选择" v-model="formCustom.productType">
                <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="状态" prop="status">
              <i-select v-model="formCustom.status">
                <i-option v-for="item in enumSelectData.get('ProductStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="适用流程" prop="flowName">
              <i-select v-model="formCustom.flowName">
                <i-option value="1">流程一</i-option>
                <i-option value="2">流程二</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              :rules="{required: true, message: '产品说明不能为空', trigger: 'blur'}"
              label="产品说明"
              prop="remark">
              <i-input v-model="formCustom.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <bs-form-block :title="'产品特性'" v-if="!isAdd">
          <div class="form-top-actions">
            <i-button @click="openModalFeature" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
          </div>
          <i-table :loading="tabelFeatureLoading" border ref="tableFeature" :columns="columnsFeature" :data="dataFeature"></i-table>
        </bs-form-block>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <!--新增产品弹窗里的产品配置弹窗-->
    <pt-modal :title="'新增产品特性'" v-model="showFeatureModal" :width="600">
      <i-form ref="formFeature" :model="formFeature" label-position="right" :label-width="100">
        <i-form-item
          :rules="{required: true, message: '标签不能为空', trigger: 'blur'}"
          label="标签"
          prop="productTag">
          <i-input v-model="formFeature.productTag" placeholder="请输入标签"></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formFeatureSubmit" :loading="buttonFeatureLoading">
            <span v-if="!buttonFeatureLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formFeatureCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <!--利率方案配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]利率方案配置'" v-model="LlShowModel" :width="1200">
      <conf-model-lilv  @notice-lilv="noticeLilvFun" :child-msg="clickRow" v-if="LlShowModel"></conf-model-lilv>
    </pt-modal>
    <!--费用收取配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]费用收取配置'" v-model="FyShowModal" :width="1200">
      <conf-model-fy  @notice-cost="noticeCostFun" :child-msg="clickRow" v-if="FyShowModal"></conf-model-fy>
    </pt-modal>
    <!--贷款材料配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]贷款材料配置'" v-model="LoanShowModal" :width="1200">
      <conf-model-loan @notice-loan="noticeLoanFun" :child-msg="clickRow" v-if="LoanShowModal"></conf-model-loan>
    </pt-modal>
    <!--放款条件配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]放款条件配置'" v-model="LendingShowModal" :width="1200">
      <conf-model-lending @notice-lending="noticeLendingFun" :child-msg="clickRow" v-if="LendingShowModal"></conf-model-lending>
    </pt-modal>
    <!--准入规则配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]准入规则配置'" v-model="RuleShowModal" :width="1200">
      <conf-model-rule @notice-rule="noticeRuleFun" :child-msg="clickRow" v-if="RuleShowModal"></conf-model-rule>
    </pt-modal>
    <!--归档材料配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]归档材料配置'" v-model="FileShowModal" :width="1200">
      <conf-model-file @notice-file="noticeFileFun" :child-msg="clickRow" v-if="FileShowModal"></conf-model-file>
    </pt-modal>
    <!--合同模板配置弹窗-->
    <pt-modal :title="'[ '+clickRow.productName+' ]合同模板配置'" v-model="ContractShowModal" :width="1200">
      <conf-model-contract @notice-file="noticeContractFun" :child-msg="clickRow" v-if="ContractShowModal"></conf-model-contract>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinDataFeature from './mixin-data-feature';
  import ConfModelLilv from './configure-model-lilv'; //  利率方案配置
  import ConfModelFy from './configure-model-cost'; //  费用收取配置
  import ConfModelLoan from './configure-model-loan'; //  贷款材料配置
  import ConfModelLending from './configure-model-lending'; // 放款条件配置
  import ConfModelRule from './configure-model-rule'; //  准入规则配置
  import ConfModelFile from './configure-model-file'; //  归档材料配置
  import ConfModelContract from './configure-model-contract'; //  合同模板配置
  export default {
    name: 'prolist',
    mixins: [MixinData, MixinDataFeature],
    components: {
      'pt-modal': PTModal,
      'conf-model-lilv': ConfModelLilv,
      'conf-model-fy': ConfModelFy,
      'conf-model-loan': ConfModelLoan,
      'conf-model-lending': ConfModelLending,
      'conf-model-rule': ConfModelRule,
      'conf-model-file': ConfModelFile,
      'conf-model-contract': ConfModelContract
    },
    data() {
      return {
        isAdd: true,
        isModal: false,
        tabelFeatureLoading: false,
        showFeatureModal: false,
        buttonFeatureLoading: false,
        formFeature: {
          productTag: ''
        },
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        isClickRow: false,        // 是否已经选择了某一行
        LlShowModel: false,           // 利率方案配置弹窗
        FyShowModal: false,           // 费用收取配置弹窗
        LoanShowModal: false,         // 贷款材料配置弹窗
        LendingShowModal: false,         // 放款条件配置弹窗
        RuleShowModal: false,         // 准入规则配置弹窗
        FileShowModal: false,         // 归档材料配置弹窗
        ContractShowModal: false,         // 合同模板配置弹窗
        clickRow: {},
        total: 0,
        pageSize: 15,
        currentPage: 1,
        formSearch: {
          productName: ''
        },
        // 列表“新增按钮”的表单
        formCustom: {
          flowCode: '', // 适用流程编号
          remark: '', // 备注
          flowName: '', // 适用流程名称
          productNo: '', // 产品编号
          productName: '',  // 产品名称
          productAlias: '',  // 产品别名
          productType: '',  // 产品类型
          status: ''  // 产品状态
        }
      };
    },
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.columns1;
        } else {
          this.$data.isModal = false;
          return [...this.$data.columns1, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      // 打开产品特性的弹层
      openModalFeature() {
        this.$data.showFeatureModal = true;
        this.$data.formFeature = {};
      },
      // 保存新增产品特性标签
      async formFeatureSubmit() {
        this.$refs['formFeature'].validate(async (valid) => {
          if (valid) {
            this.$data.buttonFeatureLoading = true;
            let resAdd = await this.$http.post('/pms/product/bindProductTag', {
              productTag: this.$data.formFeature.productTag,
              productNo: this.$data.clickRow.productNo
            });
            this.$data.buttonFeatureLoading = false; // 关闭按钮的loading状态
            this.$data.showFeatureModal = false;
            if (resAdd.success) {
              this.$Message.success('新增成功');
              this.getProductTagList();
            }
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 删除产品标签的请求
      async removeFeature(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let productTagNo = row.productTagNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/product/removeProductTag', {
              productTagNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getProductTagList();
            }
          }
        });
      },
      // 查询产品标签列表
      async getProductTagList() {
        let productNo = await this.$data.clickRow.productNo;
        this.$data.tabelFeatureLoading = true;
        let resp = await this.$http.get('/pms/product/listProductTag', {
          productNo,
          currentPage: 1,
          pageSize: 999999
        });
        this.$data.tabelFeatureLoading = false;
        if (resp.success && resp.body.resultList.length !== 0) {
          this.$data.dataFeature = resp.body.resultList;
        } else {
          this.$data.dataFeature = [];
        }
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/product/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          productName: this.$data.formSearch.productName
        });
        this.$data.dataLoading = false;
        this.$data.clickRow = {};
        this.$data.isClickRow = false;
        if (resp.success && resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
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
          productAlias: this.$data.formCustom.productAlias,
          productName: this.$data.formCustom.productName,
          status: this.$data.formCustom.status
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAddModal = false;
        if (resAdd.success) {
          this.$Message.success('新增产品成功');
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      search() {
        this.getPrivateCustomerList(1);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.showAddModal = true;
      },
      async setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = await row;
        this.$data.clickRow = await row;
        this.getProductTagList(); // 修改时加载产品特性列表
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
          productAlias: this.$data.formCustom.productAlias,  // 产品别名
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
            let respDel = await this.$http.post('/pms/product/remove', {
              status: row.status,
              productNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除产品成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getPrivateCustomerList(jumpPage);
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
      // 关闭新增产品特性弹窗
      formFeatureCancel() {
        this.$data.showFeatureModal = false;
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
      // 打开放款条件配置弹窗
      lendingClick() {
        if (this.clickRowedFun()) {
          this.$data.LendingShowModal = true;
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
      // 费用收取配置弹窗传参
      noticeCostFun() {
        this.$data.FyShowModal = false;
      },
      // 贷款材料配置弹窗传参
      noticeLoanFun() {
        this.$data.LoanShowModal = false;
      },
      // 放款条件配置弹窗传参
      noticeLendingFun() {
        this.$data.LendingShowModal = false;
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
