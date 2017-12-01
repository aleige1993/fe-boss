<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/companycustomer">企业客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>{{currentPageBreadcrumb}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="主体信息">
        <tab-company-customer-basic-info v-if="tabIndex===0" @on-submit-success="submitBssicSuccess"></tab-company-customer-basic-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="股东信息">
        <tab-shareholder-info :customer="addCustomer" v-if="tabIndex===1"></tab-shareholder-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="银行账户信息">
        <tab-bank-account-info :customer="addCustomer" v-if="tabIndex===2"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="关联企业">
        <tab-relation-company :customer="addCustomer" v-if="tabIndex===3"></tab-relation-company>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="大数据信息">
        <tab-business-contact :customer="addCustomer" v-if="tabIndex===4"></tab-business-contact>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="诉讼情况">
        <tab-lawsuit-info :customer="addCustomer" v-if="tabIndex===5"></tab-lawsuit-info>
      </i-tab-pane>
    </i-tabs>

  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import TabCompanyCustomerBasicInfo from '@/components/form-company-customer-basic/index.vue';
  import TabShareholderInfo from './tab-shareholder-info/index.vue';
  import TabBankAccountInfo from './tab-bank-account-info/index.vue';
  import TabRelationCompany from './tab-relation-company/index.vue';
  import TabBusinessContact from './tab-business-contact/index.vue';
  import TabLawsuitInfo from './tab-lawsuit-info/index.vue';
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  export default {
    name: 'modifyCompanyCustomer',
    mixins: [MixinData],
    data() {
      return {
        tabIndex: 0,
        addCustomer: null,
        currentPageBreadcrumb: '添加客户'
      };
    },
    computed: {
      otherDisabled() {
        return this.$data.addCustomer === null;
      }
    },
    watch: {
      '$route': {
        handler(newVal, oldVal) {
          this.$data.tabIndex = 0;
          this.initPage();
        },
        deep: true
      }
    },
    components: {
      'bs-modal': BSModal,
      TabCompanyCustomerBasicInfo,
      'tab-shareholder-info': TabShareholderInfo,
      'idcard-placeholder': IDCardPlaceholder,
      'tab-bank-account-info': TabBankAccountInfo,
      TabRelationCompany,
      TabBusinessContact,
      TabLawsuitInfo
    },
    methods: {
      resetAddCustomerForm() {
        this.$refs['formAddCustomer'].resetFields();
      },
      submitBssicSuccess(res) {
        this.$data.addCustomer = res;
      },
      initPage() {
        if (this.$route.query.id) {
          this.$data.currentPageBreadcrumb = '修改客户信息';
        } else if (this.$route.query.from === 'detail') {
          this.$data.currentPageBreadcrumb = '客户信息详情';
        } else {
          this.$data.currentPageBreadcrumb = '添加客户';
        }
      }
    },
    mounted() {
      this.initPage();
    }
  };
</script>
<style lang="scss" scoped>
</style>
