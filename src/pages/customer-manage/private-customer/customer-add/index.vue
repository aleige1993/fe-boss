<template>
  <div id="" style="position:relative">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/toleftnav">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">个人客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>客户添加</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" :animated="false" type="card" @on-click="tabChange">
      <i-tab-pane label="主体信息">
        <tab-basic-info type="page" :customer="addCustomer" @on-submit-success="basicInfoSaved"></tab-basic-info>
      </i-tab-pane>
      <i-tab-pane :disabled="spouseDisabled" label="配偶信息">
        <tab-spouse-info v-if="tabIndex === 1" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-spouse-info>
      </i-tab-pane>
      <!-- <i-tab-pane :disabled="otherDisabled" label="联系人信息">
        <tab-contact-info v-if="tabIndex === 2" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-contact-info>
      </i-tab-pane>-->
      <i-tab-pane :disabled="otherDisabled" label="银行账户信息">
        <tab-bank-account-info v-if="tabIndex === 2" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="征信信息">
        <tab-credit-info v-if="tabIndex === 3" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-credit-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="旗下公司">
        <tab-owe-company-info v-if="tabIndex === 4" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-owe-company-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="负面调查">
        <tab-negative-survey-info v-if="tabIndex === 5" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-negative-survey-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="大数据信息">
        <tab-business-contact-info v-if="tabIndex === 6" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-business-contact-info>
      </i-tab-pane>
      <i-tab-pane :disabled="otherDisabled" label="诉讼情况">
        <tab-lawsuit-info v-if="tabIndex === 7" :customer="addCustomer" :isFromDetail="isFromDetail"></tab-lawsuit-info>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  /* global Alertify */
  import MixinData from './mixin-data';
  import TabBasicInfo from '@/components/form-private-customer-basic';
  import TabSpouseInfo from './spouse-info/index.vue';
  import TabContactInfo from './contact-info/index.vue';
  import TabBankAccountInfo from './bank-account-info/index.vue';
  import TabCreditInfo from './credit-info/index.vue';
  import TabOweCompanyInfo from './owe-company-info/index.vue';
  import TabNegativeSurveyInfo from './negative-survey/index.vue';
  import TabBusinessContactInfo from './business-contact/index.vue';
  import TabLawsuitInfo from './lawsuit-info/index.vue';
  import BsModal from '@/components/bs-modal';
  import TableEmployerList from '@/components/table-employer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: 'modifyPrivateCustomer',
    mixins: [MixinData],
    data() {
      return {
        addCustomer: null,
        // currentCustomer: null,
        meberNo: null,
        tabIndex: 0,
        isFromDetail: false,
        initFormLoading: false
      };
    },
    computed: {
      id() {
        return this.$route.query.id;
      },
      otherDisabled() {
        return this.$data.addCustomer === null;
      },
      spouseDisabled() {
        return this.$data.addCustomer === null || this.$data.addCustomer.mbMemberDTO.maritalStatus !== '1';
      }
    },
    watch: {
      '$route'(to, from) {
        // console.log(this.$forceUpdate);
      }
    },
    components: {
      TabBasicInfo,
      'tab-spouse-info': TabSpouseInfo,
      'tab-contact-info': TabContactInfo,
      TabBankAccountInfo,
      TabCreditInfo,
      TabOweCompanyInfo,
      TabNegativeSurveyInfo,
      TabBusinessContactInfo,
      TabLawsuitInfo,
      BsModal,
      TableEmployerList,
      TableCompanyCustomerList
    },
    methods: {
      tabChange(name) {
        if (name !== 0 && !this.$data.addCustomer) {
          Alertify.alert('请先完成基础信息');
          this.$data.tabIndex = 0;
        }
      },
      basicInfoSaved(data) {
        this.$data.addCustomer = data;
        // console.log(customer);
      }
    },
    mounted() {
      if (this.$route.query.from === 'detail') {
        this.$data.isFromDetail = true;
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
