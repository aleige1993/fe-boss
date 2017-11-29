<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">企业客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>客户修改</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs :animated="false" type="card" @on-click="tabChange">
      <i-tab-pane label="主体信息">
        <tab-company-customer-basic-info></tab-company-customer-basic-info>
      </i-tab-pane>
      <i-tab-pane label="股东信息">
        <tab-shareholder-info></tab-shareholder-info>
      </i-tab-pane>
      <i-tab-pane label="银行账户信息">
        <tab-bank-account-info></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane label="关联企业">
        <tab-relation-company></tab-relation-company>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-business-contact></tab-business-contact>
      </i-tab-pane>
      <i-tab-pane label="诉讼情况">
        <tab-lawsuit-info></tab-lawsuit-info>
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
        customerId: null
      };
    },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
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
      tabChange(name) {
        // alert(name); // 0,1,2,3
      },
      resetAddCustomerForm() {
        this.$refs['formAddCustomer'].resetFields();
      }
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
</style>
