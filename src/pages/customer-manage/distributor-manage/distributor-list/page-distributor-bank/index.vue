<template>
  <div id="DistributorBank">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>【{{$route.query.corpName}}】银行账号维护</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border :height="tableFixHeight+98" :loading="dataLoading" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal :title="isAdd?'添加银行账户':'编辑银行账户'" v-model="addBankModal">
      <i-form v-if="addBankModal" ref="bankForm" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="账户名" prop="acctName"
                     class="required"
                     :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}">
          <i-input v-model="formData.acctName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="账户类型" prop="accountType"
                     class="required"
                     :rules="{required: true, message: '账户类型不能为空', trigger: 'change'}">
          <i-select v-model="formData.accountType" placeholder="">
            <i-option v-for="item in enumSelectData.get('PublicFlagEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <!--对公的时候必填身份证号码-->
        <div v-if="formData.accountType === '1'">
          <i-form-item label="账号" prop="acctNo"
                       class="required"
                       :rules="{required: true, message: '账号不能为空', trigger: 'blur'}">
            <i-input v-model="formData.acctNo" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="银行名称" prop="bankNo"
                       class="required"
                       :rules="{required: true, message: '银行名称不能为空', trigger: 'blur'}">
            <i-select @on-change="selectBank" :label-in-value="true" v-model="formData.bankNo" placeholder="">
              <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="开户行" prop="openBankName"
                       class="required"
                       :rules="{required: true, message: '开户行不能为空', type: 'string', trigger: 'blur'}">
            <i-input type="text" v-model="formData.openBankName" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="开户行号" prop="openBankNo"
                       class="required"
                       :rules="{required: true, message: '开户行号不能为空', trigger: 'blur'}">
            <i-input v-model="formData.openBankNo" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="开户行所在省" prop="openBankProvince"
                       class="required"
                       :rules="{required: true, message: '请选择开户行所在省'}">
            <input v-model="formData.openBankProvince" type="hidden"/>
            <i-select :placeholder="formData.openBankProvince||''" :label-in-value="true" @on-change="provinceChange">
              <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="开户行所在市" prop="openBankCity"
                       class="required"
                       :rules="{required: true, message: '请选择开户行所在市'}">
            <input v-model="formData.openBankCity" type="hidden"/>
            <i-select :placeholder="formData.openBankCity||''" :label-in-value="true" @on-change="cityChange">
              <i-option v-for="item in cityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="清算行行号" prop="openBankClearingNo"
                       class="required"
                       :rules="{required: true, message: '请输入清算行行号'}">
            <i-input type="text" v-model="formData.openBankClearingNo" placeholder=""></i-input>
          </i-form-item>
        </div>
        <!--对私的时候必填身份证号码-->
        <div v-if="formData.accountType === '0'">
          <i-form-item label="身份证号码"
                       prop="idCardNo"
                       :rules="{required: true, message: '身份证号码不能为空', trigger: 'blur'}">
            <i-input v-model="formData.idCardNo" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="账号" prop="acctNo">
            <i-input v-model="formData.acctNo" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="银行名称" prop="bankNo">
            <i-select @on-change="selectBank" :label-in-value="true" v-model="formData.bankNo" placeholder="">
              <i-option v-for="item in bankList" :key="item.bankCode" :value="item.bankCode">{{item.bankName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="开户行" prop="openBankName">
            <i-input type="text" v-model="formData.openBankName" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="开户行号" prop="openBankNo">
            <i-input v-model="formData.openBankNo" placeholder=""></i-input>
          </i-form-item>
          <i-form-item label="开户行所在省" prop="openBankProvince">
            <input v-model="formData.openBankProvince" type="hidden"/>
            <i-select :placeholder="formData.openBankProvince||''" :label-in-value="true" @on-change="provinceChange">
              <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="开户行所在市" prop="openBankCity">
            <input v-model="formData.openBankCity" type="hidden"/>
            <i-select :placeholder="formData.openBankCity||''" :label-in-value="true" @on-change="cityChange">
              <i-option v-for="item in cityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="清算行行号" prop="openBankClearingNo">
            <i-input type="text" v-model="formData.openBankClearingNo" placeholder=""></i-input>
          </i-form-item>
        </div>
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
    </bs-modal>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  // import MixinTabComputed from '../mixin-tab-computed';
  export default {
    name: 'TabDistributorBankAccountInfo',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        isAdd: false,
        addBankModal: false,
        submitLoading: false,
        dataLoading: false,
        bankList: [],
        provinceDropList: [],
        cityDropList: [],
        formData: {
          'merchantNo': '',
          'corpName': '',
          'acctName': '',
          'accountType': '',
          'idCardNo': '',
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
    watch: {
      'formData.accountType'(newVal, oldVal) {
        if ((typeof oldVal !== 'undefined') && oldVal !== '') {
          if (newVal === '1') {
            this.$data.formData.idCardNo = '';
          }
          /* this.$set(this.$data.formData, 'acctNo', '');
          this.$set(this.$data.formData, 'bankNo', '');
          this.$set(this.$data.formData, 'bankName', '');
          this.$set(this.$data.formData, 'openBankName', '');
          this.$set(this.$data.formData, 'openBankNo', '');
          this.$set(this.$data.formData, 'openBankProvince', '');
          this.$set(this.$data.formData, 'openBankCity', '');
          this.$set(this.$data.formData, 'openBankClearingNo', '');*/
        }
      }
    },
    computed: {},
    methods: {
      openAddModal() {
        this.$data.formData = {};
        this.$data.addBankModal = true;
        this.$data.isAdd = true;
      },
      selectBank(select) {
        this.$data.formData.bankName = select.label;
      },
      submitForm() {
        this.$refs['bankForm'].validate(async (valid) => {
          if (valid) {
            this.$data.submitLoading = true;
            this.$data.formData.merchantNo = this.$route.query.merchantNo;
            this.$data.formData.corpName = this.$route.query.corpName;
            let resp = await this.$http.post('/merchant/acct/save', this.$data.formData);
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
        let resp = await this.$http.post('/merchant/acct/list', {
          merchantNo: this.$route.query.merchantNo,
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
#DistributorBank {
  & .ivu-select-placeholder {
    color: #495060;
  }
}
</style>
