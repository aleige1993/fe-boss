<template>
  <div>
    <div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
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
          <i-select v-model="formData.bankCode" placeholder="">
            <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行" prop="openBankCode"
          :rules="{required: true, message: '开户行不能为空', trigger: 'blur'}">
          <i-input v-model="formData.openBankCode" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行号" prop="openBankName"
        :rules="{required: true, message: '开户行号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.openBankName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="预留手机号" prop="bankMobile"
          :rules="{required: true, message: '预留手机号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.bankMobile" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="remark">
          <i-input v-model="formData.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button :loading="submitLoading" @click="submitForm" type="primary" size="large" style="width: 80px;">
            <span v-if="!submitLoading">提交</span>
            <span v-else>Loading...</span>
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
          memberNo: '',
          name: '',
          bankCardNo: '',
          bankCode: '',
          bankName: '',
          openBankCode: '',
          openBankName: '',
          bankMobile: '',
          remark: ''
        }
      };
    },
    props: ['isFromDetail'],
    methods: {
      submitForm() {
        this.$refs['bankForm'].validate(async (valid) => {
          if (valid) {
            this.$data.submitLoading = true;
            let resp = await this.$http.post('/member/account/insert', this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.reCode === '0000') {
              alert('添加成功');
            }
          } else {
            this.$Notice.error({
              desc: '清完善银行信息!'
            });
          }
        });
      },
      async getCustomerBankList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/account/query', { memberNo: '' });
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
