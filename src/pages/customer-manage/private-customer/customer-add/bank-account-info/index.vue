<template>
  <div>
    <!--<div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">-->
      <!--<i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>-->
    <!--</div>-->
    <i-table :height="tableFixHeight+98" :loading="dataLoading" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="添加联系人" v-model="addBankModal">
      <i-form ref="bankForm" :model="formData" label-position="left" :label-width="90">
        <i-form-item label="账户名" prop="name"
          :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}">
          <i-input v-model="formData.name" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="账号" prop="bankCardNo"
          :rules="{required: true, message: '账号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.bankCardNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="银行名称" prop="bankCode"
          :rules="{required: true, message: '银行名称不能为空', trigger: 'change'}">
          <i-select @on-change="selectBank" v-model="formData.bankCode" :label-in-value="true" placeholder="">
            <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行" prop="openBankName">
          <i-input v-model="formData.openBankName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行号" prop="openBankCode">
          <i-input v-model="formData.openBankCode" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="预留手机号" prop="bankMobile"
          :rules="{required: true, message: '预留手机号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.bankMobile" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" :rows="4" v-model="formData.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button :loading="submitLoading" @click="submitForm" type="primary" size="large" style="width: 120px;">
            <span v-if="!submitLoading">提交</span>
            <span v-else>请求中...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'TabPrivateCustomerAddBankAccountInfo',
    mixins: [MixinData],
    data() {
      return {
        addBankModal: false,
        submitLoading: false,
        dataLoading: false,
        bankList: [],
        formData: {
          id: '',
          memberNo: '',
          name: '',
          bankCardNo: '',
          bankCode: '',
          bankName: '',
          openBankCode: '',
          openBankName: '',
          bankMobile: '',
          certNo: '',
          remark: ''
        }
      };
    },
    computed: {
      memberNo() {
        if (this.$route.query.id) {
          return this.$route.query.id;
        } else {
          return this.customer.mbMemberDTO.memberNo;
        }
      }
    },
    props: ['isFromDetail', 'customer'],
    methods: {
      openAddModal() {
        this.$data.formData = {};
        this.$data.addBankModal = true;
      },
      selectBank(select) {
        this.$data.formData.bankName = select.label;
      },
      submitForm() {
        this.$refs['bankForm'].validate(async (valid) => {
          if (valid) {
            let url = '';
            let recordId = this.$data.formData.id;
            if (recordId && recordId !== '') {
              url = '/member/account/update';
            } else {
              url = '/member/account/insert';
            }
            this.$data.submitLoading = true;
            this.$data.formData.memberNo = this.memberNo;
            // 获取客户证件号码
            let getCertNo = await this.$http.post('/member/find', { memberNo: this.memberNo });
            if (getCertNo.success) {
              this.$data.formData.certNo = getCertNo.body.mbMemberDTO.certNo;
            } else {
              this.$data.formData.certNo = '';
            }
            let resp = await this.$http.post(url, this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.reCode === '0000') {
              this.$Message.success('保存成功');
              this.$data.addBankModal = false;
              this.getCustomerBankList();
            }
          }
        });
      },
      async getCustomerBankList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/account/query', { memberNo: this.memberNo });
        this.$data.dataLoading = false;
        this.$data.bankAccountDatas = resp.body;
      },
      async getBankList() {
        let resp = await this.$http.post('/common/support/bank/list');
        this.$data.bankList = resp.body;
      }
    },
    components: {
      'pt-modal': PTModal
    },
    mounted() {
      this.getCustomerBankList();
      this.getBankList();
    }
  };
</script>
<style lang="scss">

</style>
