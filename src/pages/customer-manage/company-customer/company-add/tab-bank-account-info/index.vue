<template>
  <div>
    <div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">
      <i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :height="tableFixHeight+98" :loading="dataLoading" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="添加银行账户" v-model="addBankModal">
      <i-form ref="bankForm" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="账户名" prop="acctName"
          :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}">
          <i-input v-model="formData.acctName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="账号" prop="acctNo"
          :rules="{required: true, message: '账号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.acctNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="银行名称" prop="bankNo"
          :rules="{required: true, message: '银行名称不能为空', trigger: 'blur'}">
          <i-select @on-change="selectBank" :label-in-value="true" v-model="formData.bankNo" placeholder="">
            <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行" prop="openBankName"
          :rules="{required: true, message: '开户行不能为空', type: 'string', trigger: 'blur'}">
          <i-input type="text" v-model="formData.openBankName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行号" prop="openBankNo"
        :rules="{required: true, message: '开户行号不能为空', trigger: 'blur'}">
          <i-input v-model="formData.openBankNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行所在省" prop="openBankProvince"
                     :rules="{required: true, message: '请选择开户行所在省'}">
          <input v-model="formData.openBankProvince" type="hidden"/>
          <i-select :placeholder="formData.openBankProvince" :label-in-value="true" @on-change="provinceChange">
            <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行所在市" prop="openBankCity"
                     :rules="{required: true, message: '请选择开户行所在市'}">
          <input v-model="formData.openBankCity" type="hidden"/>
          <i-select :placeholder="formData.openBankCity" :label-in-value="true" @on-change="cityChange">
            <i-option v-for="item in cityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="清算行行号" prop="openBankClearingNo"
                     :rules="{required: true, message: '请输入清算行行号'}">
          <i-input type="text" v-model="formData.openBankClearingNo" placeholder=""></i-input>
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
        provinceDropList: [],
        cityDropList: [],
        formData: {
          'corpNo': '',
          'corpName': '',
          'acctName': '',
          'acctNo': '',
          'bankNo': '',
          'bankName': '',
          'openBankName': '',
          'openBankNo': '',
          'openBankClearingNo': '',
          'openBankProvince': '',
          'openBankCity': '',
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
            this.$data.formData.corpName = this.corpName;
            let resp = await this.$http.post(url, this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.reCode === '0000') {
              this.$Message.success('保存成功');
              this.$data.addBankModal = false;
              this.getCustomerBankList();
            }
          } else {
            this.$Notice.error({
              title: '错误提示', desc: '请完善银行信息!'
            });
          }
        });
      },
      // 获取地址下拉联动
      getAddressDropList(code = '') {
        let data = {
          regionCode: code
        };
        return this.$http.post('/common/region/list', data, false);
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
        let resp = await this.$http.post('/support/bank/list');
        this.$data.bankList = resp.body;
      },
      async provinceChange(val) {
        this.$data.formData.openBankProvince = val.label;
        let resp = await this.getAddressDropList(val.value);
        if (resp.success) {
          this.$data.cityDropList = resp.body;
        }
      },
      cityChange(val) {
        this.$data.formData.openBankCity = val.label;
      }
    },
    components: {
      'pt-modal': PTModal
    },
    async mounted() {
      this.getCustomerBankList();
      this.getBankList();
      let resp = await this.getAddressDropList();
      if (resp.success) {
        this.$data.provinceDropList = resp.body;
      }
    }
  };
</script>
<style lang="scss">

</style>
