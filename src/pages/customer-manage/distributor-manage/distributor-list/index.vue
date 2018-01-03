<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商列表</i-breadcrumb-item>
    </i-breadcrumb>
    <!--渠道商列表公共组件-->
    <table-distributor-list :type="'page'" ref="tableDistributorList" @on-radio-fun="radioFun" @on-cancel-clickRow="isClickRow = false" @on-set-row="setRow" @on-row-dbclick="selectRow">
      <div class="form-top-actions" slot="topAction">
        <i-button type="info" @click="openAddDistributorModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        <i-button type="info" @click="openCarModal"><i class="iconfont icon-xinzeng"></i> 车型管理</i-button>
        <i-button type="info" @click="openQuotaModal"><i class="iconfont icon-xinzeng"></i> 额度管理</i-button>
        <i-button type="info" @click="openOperatorModal"><i class="iconfont icon-xinzeng"></i> 操作员管理</i-button>
        <i-button v-show="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
      </div>
    </table-distributor-list>
    <!--新增修改模态框-->
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="600">
      <i-form v-if="showAddModal" ref="formAdd" :model="formAdd" label-position="right" :label-width="120" style="padding: 30px 0;">
        <i-row>
          <!--客户名称-->
          <i-col>
            <i-form-item
              label="客户名称"
              :rules="{required: true, message: '客户名称不能为空', trigger: 'blur'}"
              prop="corpName">
              <input type="hidden" v-model="formAdd.corpNo"/>
              <i-input v-model="formAdd.corpName" :readonly="true" placeholder="选择客户">
                <i-button @click="showSelectCompany=!showSelectCompany" slot="append">选择客户 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--是否开通商户平台-->
          <i-col>
            <i-form-item
              label="是否开通商户平台"
              :rules="{required: true, message: '请选择是否开通商户平台', trigger: 'change'}"
              prop="isEnablePlatform">
              <i-select v-model="formAdd.isEnablePlatform">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <!--渠道商类型-->
        <i-row>
          <i-col>
            <i-form-item
              label="渠道商类型"
              prop="merchantType"
              :rules="{required: true, message: '请选择渠道商类型', trigger: 'change'}">
              <i-select v-model="formAdd.merchantType">
                <i-option v-for="item in enumSelectData.get('MerchantTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col>
            <i-form-item
              label="渠道商简称"
              prop="roadAddr"
              :rules="{required: true, message: '请选择渠道商类型', trigger: 'blur'}">
              <i-input v-model="formAdd.roadAddr" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <!--是否在app中显示-->
        <i-row>
          <i-col>
            <i-form-item
              label="是否在app中显示"
              :rules="{required: true, message: '请选择是否在app中显示', trigger: 'change'}"
              prop="isDisplayInApp">
              <i-select v-model="formAdd.isDisplayInApp">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col>
            <br>
            <br>
            <i-form-item class="text-right">
              <i-button type="primary" @click="submitFun" :loading="buttonLoading">
                <span v-if="!buttonLoading">提交</span>
                <span v-else>loading...</span>
              </i-button>
              <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </bs-modal>
    <!--选择客户的模态框-->
    <bs-modal :title="'选择公司'" v-model="showSelectCompany" :width="1200">
      <table-company-customer-list v-if="showSelectCompany" ref="companyTable" type="modal" @on-row-dbclick="selectCompanyRow"></table-company-customer-list>
    </bs-modal>
  </div>
</template>
<script>
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  import tableDistributorList from '@/components/table-distributor-list';
  import BsModal from '@/components/bs-modal';
  export default {
    name: '',
    data() {
      return {
        showAddModal: false,
        buttonLoading: false,
        formSearch: {
          corpName: ''
        },
        showSelectCompany: false,
        formAdd: {
          'merchantNo': '',
          'isEnablePlatform': '',
          'custMgrNo': '',
          'custMgrName': '',
          'corpNo': '',
          'corpName': '',
          'suCreditCode': '',
          'legalPerson': '',
          'regDate': '',
          'provinceName': '',
          'provinceCode': '',
          'cityName': '',
          'cityCode': '',
          'districtName': '',
          'districtCode': '',
          'roadAddr': '',
          'applyNo': '',
          'regCapital': '',
          'telephone': '',
          'creditTotalLimit': '',
          'currentUsableLimit': '',
          'singleUsableLimit': '',
          'creditStartDate': '',
          'creditEndDate': '',
          'creditReleaseType': '',
          'merchantStatus': '',
          'merchantType': '',
          'isDisplayInApp': '',
          'merchantLogo': ''
        },
        isAdd: false,
        dataLoading: false,
        clickRow: {},
        isClickRow: false,        // 是否已经选择了某一行
        total: 0,
        currentPage: 1,
        pageSize: 15
      };
    },
    components: {
      BsModal,
      tableDistributorList,
      TableCompanyCustomerList
    },
    methods: {
      // 选择客户
      selectCompanyRow(row, index) {
        this.$data.formAdd.corpNo = row.corpNo;
        this.$data.formAdd.corpName = row.corpName;
        this.$data.showSelectCompany = false;
      },
      // 新增
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('merchant/saveMerchant', {
          ...this.$data.formAdd
        });
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          let text = this.$data.isAdd ? '新增成功' : '修改成功';
          this.$Message.success(text);
          this.$refs.tableDistributorList.getPrivateCustomerList();
        }
      },
      // 修改
      setRow(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formAdd = row;
      },
      // 提交
      submitFun() {
        const formName = 'formAdd';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消
      cancelFun() {
        this.$data.showAddModal = false;
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.formAdd.logoUrl = res.body.url;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$Notice.error({
          desc: err
        });
      },
      // 子组件通知 单选了每一行
      radioFun(currentRow) {
        this.$data.clickRow = currentRow;
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$data.isClickRow = false;
        }
        this.$data.isClickRow = true;
      },
      // 取消选中行的选中状态
      handleClearCurrentRow() {
        this.$refs.tableDistributorList.handleClearCurrentRow();
        this.$data.isClickRow = false;
        this.$data.clickRow = {};
      },
      openAddDistributorModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formAdd = {};
      },
      // 判断是否选中的其中一行
      clickRowedFun() {
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$Notice.error({
            title: '请先选择渠道商',
            duration: 2
          });
          return false;
        }
        return true;
      },
      // 打开车型管理
      openCarModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/car',
            query: {
              currentPage: this.$data.currentPage,
              from: this.$data.clickRow.from,
              merchantNo: this.$data.clickRow.merchantNo
            }
          });
        }
      },
      // 打开额度管理
      openQuotaModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/quota',
            query: {
              currentPage: this.$data.currentPage,
              merchantNo: this.$data.clickRow.merchantNo,
              corpName: this.$data.clickRow.corpName,
              custMgrName: this.$data.clickRow.custMgrName
            }
          });
        }
      },
      // 打开操作员管理
      openOperatorModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/admin',
            query: {
              currentPage: this.$data.currentPage,
              merchantNo: this.$data.clickRow.merchantNo
            }
          });
        }
      },
      // 双击时的回调 （此页面用不到此功能）
      selectRow(row, index) {}
    }
  };
</script>
<style lang="scss" scoped="">

</style>
