<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="addOweCompany"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="loadingData" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal :title="'添加公司信息'" v-model="addBankModal">
      <i-form ref="formAddOweCompany" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="公司名称" prop="companyName"
                     :rules="{required: true, message: '请选择公司'}">
          <i-input :readonly="true" v-model="formData.companyName" placeholder="">
            <i-button @click="slectOweCompanyModal=!slectOweCompanyModal" slot="append">选择公司 <i-icon type="ios-more"></i-icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="统一社会使用代码" prop="mail">
          <i-input :readonly="true" v-model="formData.suCreditCode" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="关系" prop="relative"
                     :rules="{required: true, message: '请选择关系', trigger: 'change'}">
          <i-select v-model="formData.relative" id="u5568_input" placeholder="">
            <i-option v-for="item in enumSelectData.get('HaveCompanyRelativeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人" prop="contactUser"
                     :rules="{required: true, message: '请输入联系人'}">
          <i-input v-model="formData.contactUser" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="联系人电话" prop="contactUserPhone"
                     :rules="{required: true, message: '请输入联系人电话'}">
          <i-input v-model="formData.contactUserPhone" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册时间" prop="regDate"
                     :rules="{required: true, message: '请输入注册时间'}">
          <bs-datepicker v-model="formData.regDate" placeholder=""></bs-datepicker>
        </i-form-item>
        <i-form-item label="注册资金" prop="regCapital"
                     :rules="{required: true, message: '请输入注册资金'}">
          <i-input v-model="formData.regCapital" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="经营地址" prop="mail">
          <i-input :readonly="true" v-model="formData.bizAddr" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input type="textarea" :rows="4" v-model="formData.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitForm" :loading="submitLoading" type="primary" size="large" style="width: 80px;">
            <span v-if="submitLoading">保存中...</span>
            <span v-else>提交</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="slectOweCompanyModal">
      <table-company-customer-list ref="tableCompanyCustomer" type="modal" @on-row-dbclick="selectCompany">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCompanyCustomerModal=!addCompanyCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-company-customer-list>
    </bs-modal>
    <bs-modal title="新增企业客户" :width="1280" v-model="addCompanyCustomerModal">
      <company-customer-basic-info @on-submit-success="addCompanySuccess" type="modal"></company-customer-basic-info>
    </bs-modal>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinComputed from '../mixin-tab-computed';
  import CompanyCustomerBasicInfo from '@/components/form-company-customer-basic/index.vue';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: '',
    mixins: [MixinData, MixinComputed],
    data() {
      return {
        loadingData: false,
        submitLoading: false,
        addBankModal: false,
        slectOweCompanyModal: false,
        addCompanyCustomerModal: false,
        formData: {
          'companyCode': '',
          'regCapital': '0.00',
          'companyName': '',
          'regDate': 'yyyy-MM-dd',
          'memberNo': '',
          'suCreditCode': '',
          'contactUserPhone': '',
          'id': '',
          'contactUser': '',
          'relative': '',
          bizAddr: '',
          remark: ''
        }
      };
    },
    props: ['isFromDetail'],
    components: {
      'bs-modal': BsModal,
      TableCompanyCustomerList,
      'company-customer-basic-info': CompanyCustomerBasicInfo
    },
    methods: {
      selectCompany(row, index) {
        // Alertify.alert('您选择的企业id：' + index);
        this.$data.formData.companyCode = row.corpNo;
        this.$data.formData.companyName = row.corpName;
        this.$data.formData.suCreditCode = row.creditCode;
        this.$data.formData.regDate = row.regDate;
        this.$data.formData.regCapital = row.regCapital;
        this.$data.formData.contactUser = row.mainLinkmanName;
        this.$data.formData.contactUserPhone = row.mainLinkmanPhone;
        this.$data.formData.bizAddr = row.bizProvinceName + row.bizDistrictName + row.bizCityName + row.bizRoadAddr;
        this.$data.slectOweCompanyModal = false;
      },
      async getOweComList() {
        this.$data.loadingData = true;
        let resp = await this.$http.post('/member/have/company/list', {
          memberNo: this.memberNo
        });
        this.$data.loadingData = false;
        if (resp.success) {
          this.$data.bankAccountDatas = resp.body;
        }
      },
      addOweCompany() {
        this.$data.formData = {};
        this.$data.addBankModal = true;
      },
      addCompanySuccess() {
        // alert('添加成功');
        this.$data.addCompanyCustomerModal = false;
        this.$refs['tableCompanyCustomer'].getCompanyCustomerList();
      },
      submitForm() {
        this.$refs['formAddOweCompany'].validate(async (valid) => {
          if (valid) {
            this.formData.memberNo = this.memberNo;
            this.$data.submitLoading = true;
            this.$data.formData.memberNo = this.memberNo;
            let resp = await this.$http.post('/member/have/company/save', this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.success) {
              this.getOweComList();
              this.$data.addBankModal = false;
            }
          }
        });
      }
    },
    mounted() {
      this.getOweComList();
    }
  };
</script>
<style lang="scss">

</style>
