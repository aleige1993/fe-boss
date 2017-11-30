<template>
  <div>
    <div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">
      <i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="添加银行账户" v-model="addBankModal">
      <i-form ref="bankForm" :model="formData" label-position="left" :label-width="90">
        <i-form-item label="账户名" prop="acctName"
          :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}">
          <i-input v-model="formData.acctName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="账号" prop="acctNo"
          :rules="{required: true, message: '账号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.acctNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="银行名称" prop="bankCode"
          :rules="{required: true, message: '银行名称不能为空', trigger: 'change'}">
          <i-select @on-change="selectBank" :label-in-value="true" v-model="formData.bankCode" placeholder="">
            <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行" prop="openBankName"
          :rules="{required: true, message: '开户行不能为空', trigger: 'blur'}">
          <i-input v-model="formData.openBankName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行号" prop="openBankNo"
        :rules="{required: true, message: '开户行号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.openBankNo" placeholder=""></i-input>
        </i-form-item>
        <!--<i-form-item label="预留手机号" prop="bankMobile"
          :rules="{required: true, message: '预留手机号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.bankMobile" placeholder=""></i-input>
        </i-form-item>-->
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
  import MixinTabComputed from '../mixin-tab-computed';
  export default {
    name: 'TabCompanyCustomerAddBankAccountInfo',
    mixins: [MixinData, MixinTabComputed],
    data() {
      return {
        addBankModal: false,
        submitLoading: false,
        dataLoading: false,
        bankList: [],
        formData: {
          'corpNo': '',
          'corpName': '',
          'acctName': '',
          'acctNo': '',
          'bankCode': '',
          'bankName': '',
          'openBankName': '',
          'openBankNo': '',
          'openBankClearingNo': '',
          'remark': ''
        }
      };
    },
    computed: {},
    props: ['customer'],
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
              url = '/corp/saveCorpAcct';
            } else {
              url = '/corp/saveCorpAcct';
            }
            this.$data.submitLoading = true;
            this.$data.formData.corpNo = this.corpNo;
            let resp = await this.$http.post(url, this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.reCode === '0000') {
              this.$Message.success('保存成功');
              this.$data.addBankModal = false;
              this.getCustomerBankList();
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
        let resp = await this.$http.post('/corp/listCorpAcct', {
          corpNo: this.corpNo,
          currentPage: 1,
          pageSize: 9999
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.bankAccountDatas = resp.body.resultList;
        }
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
