<template>
<!--渠道商详情-->
  <div id="distributorDetails">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor/details">渠道商详情</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane :label="'基本信息'">
        <modal-company-merchant-basic :corpNo="corpNo" ref="personalInfo"></modal-company-merchant-basic>
      </i-tab-pane>
      <i-tab-pane :label="'车型管理'">
        <tab-modal-car v-if="tabIndex === 1" :merchantNo="merchantNo"></tab-modal-car>
      </i-tab-pane>
      <i-tab-pane :label="'银行账户信息'">
        <tab-bank-account-info :customer="addCustomer" v-if="tabIndex===2"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane :label="'授信管理'">
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
  import TabBankAccountInfo from '@/pages/customer-manage/company-customer/company-add/tab-bank-account-info';
  import TableCompanyMerchantBasic from '@/components/detail-company-merchant-basic'; // 选择公司详情信息
  import tabModalCar from './tab-details-car'; // 车型管理
  export default {
    name: 'distributorDetails',
    components: {
      tabModalCar,
      TabBankAccountInfo,
      'modal-company-merchant-basic': TableCompanyMerchantBasic
    },
    mounted() {
      this.$data.merchantNo = this.$route.query.merchantNo;
      this.$data.corpNo = this.$route.query.corpNo;
      this.$data.addCustomer = this.$route.query.memberNo;
    },
    data() {
      return {
        tabIndex: 0,
        merchantNo: '',
        corpNo: '',
        addCustomer: null
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
