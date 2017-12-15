<template>
<!--新增渠道商-->
  <div id="addDistributor">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>新增渠道商</i-breadcrumb-item>
    </i-breadcrumb>
    <i-row>
      <i-col span="24">
        <i-form ref="formAdd" :model="formAdd" label-position="right" :label-width="120" style="padding: 30px 0;">
          <i-row>
            <!--客户名称-->
            <i-col span="8">
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
            <i-col span="8">
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
            <i-col span="8">
              <i-form-item
                label="渠道商类型"
                prop="merchantType"
                :rules="{required: true, message: '请选择渠道商类型', trigger: 'change'}">
                <i-select v-model="formAdd.merchantType">
                  <!--<i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
                  <i-option value="1">4S店</i-option>
                  <i-option value="2">一网商</i-option>
                  <i-option value="3">二网商</i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
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
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
              <br>
              <br>
              <i-form-item class="text-right">
                <i-button type="primary" @click="submitFun">提交</i-button>
                <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </i-col>
    </i-row>
    <!--选择客户的模态框-->
    <bs-modal :title="'选择权利人'" v-model="showSelectCompany" :width="1200">
      <table-company-list ref="companyTable" type="modal" @on-row-dbclick="selectCompanyRow"></table-company-list>
    </bs-modal>
  </div>
</template>

<script>
  import BsDispicker from '@/components/bs-dispicker'; // 地址联动
  import TableCompanyList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'addDistributor',
    components: {
      BsModal,
      BsDispicker,
      TableCompanyList
    },
    data() {
      return {
        currentPage: '',
        uploadFileName: '',
        showSelectCompany: false,
        formAdd: {
          isEnablePlatform: '',
          corpName: '',
          corpNo: '',
          logoUrl: '',
          merchantType: ''
        }
      };
    },
    mounted() {
      this.$data.currentPage = this.$route.query.currentPage;
    },
    methods: {
      // 选择客户
      selectCompanyRow(row, index) {
        this.$data.formAdd.corpNo = row.corpNo;
        this.$data.formAdd.corpName = row.corpName;
        this.$data.showSelectCompany = false;
      },
      // 新增
      async addSuccess() {
        this.$Message.success('新增成功');
        await bsWait(1000);
        this.$router.push({
          path: '/index/customer/distributor',
          query: {
            currentPage: this.$route.query.currentPage
          }
        });
      },
      // 提交
      submitFun() {
        const formName = 'formAdd';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消
      cancelFun() {
        this.$router.push({
          path: '/index/customer/distributor',
          query: {
            currentPage: this.$data.currentPage
          }
        });
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #addDistributor {
    & .show-upload-text {
      position: relative;
      padding-right: 36px;
      line-height: 20px;
      min-height: 20px;
      color: #666;
    }
  }
</style>
