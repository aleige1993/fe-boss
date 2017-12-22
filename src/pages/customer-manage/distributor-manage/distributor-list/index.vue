<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商列表</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="corpName">
          <i-input style="width: 240px;" type="text" placeholder="公司名称" v-model="formSearch.corpName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="openAddDistributorModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      <i-button type="info" @click="openCarModal"><i class="iconfont icon-xinzeng"></i> 车型管理</i-button>
      <i-button type="info" @click="openQuotaModal"><i class="iconfont icon-xinzeng"></i> 额度管理</i-button>
      <i-button type="info" @click="openOperatorModal"><i class="iconfont icon-xinzeng"></i> 操作员管理</i-button>
      <i-button v-show="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table :loading="dataLoading" highlight-row border ref="distributorTable" :columns="distributorColumns" :data="distributorList" @on-current-change="radioFun"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
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
          <!--<i-col>
            <i-form-item label="渠道商LOGO"
                         prop="logoUrl">
              <input type="hidden" v-model="formAdd.logoUrl"/>
              <i-upload
                type="drag"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :action="$config.HTTPBASEURL+'/common/upload'"
                style="display: inline-block;width:150px;"
                :show-upload-list="false">
                <div style="padding: 20px 20px" v-if="!formAdd.logoUrl||formAdd.logoUrl===''">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p style="line-height: 16px">点击选择文件或者拖放文件到这里</p>
                </div>
                <img v-if="formAdd.logoUrl!==''"  width="150" height="150" :src="formAdd.logoUrl" title="点击重新上传">
              </i-upload>
            </i-form-item>
          </i-col>-->
          <i-col>
            <i-form-item
              label="渠道商简称"
              prop="roadAddr">
              <i-input v-model="formAdd.roadAddr" placeholder=""></i-input>
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
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
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
    mounted() {
      this.getPrivateCustomerList();
    },
    components: {
      BsModal,
      TableCompanyCustomerList
    },
    methods: {
      // 冻结
      async congeal(row) {
        const msg = this.$Message.loading('正在冻结...', 0);
        let resp = await this.$http.get('merchant/statusMerchant', {
          merchantNo: row.merchantNo,
          merchantStatus: '6'
        });
        msg();
        if (resp.success) {
          this.$Message.success('冻结成功');
          this.getPrivateCustomerList();
        } else {
          this.$Message.error('冻结失败');
        }
      },
      // 选择客户
      selectCompanyRow(row, index) {
        this.$data.formAdd.corpNo = row.corpNo;
        this.$data.formAdd.corpName = row.corpName;
        this.$data.showSelectCompany = false;
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/listMerchant', {
          corpName: this.$data.formSearch.corpName, // 公司名称，模糊查询
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.clickRow = {};
        this.$data.isClickRow = false;
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.distributorList = [];
        }
      },
      // 模糊查询
      searchSubmit() {
        this.getPrivateCustomerList();
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
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
          this.getPrivateCustomerList();
        }
      },
      // 删除
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('merchant/deleteMerchant', {
              merchantNo: row.merchantNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getPrivateCustomerList(jumpPage);
            }
          }
        });
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
        this.$refs.distributorTable.clearCurrentRow();
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
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
