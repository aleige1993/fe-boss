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
        <modal-company-merchant-basic :corpNo="$route.query.corpNo" ref="personalInfo"></modal-company-merchant-basic>
      </i-tab-pane>
      <i-tab-pane :label="'车型管理'">
        <tab-modal-car v-if="tabIndex === 1" :merchantNo="$route.query.merchantNo"></tab-modal-car>
      </i-tab-pane>
      <i-tab-pane :label="'银行账户信息'">
        <tab-bank-account-info v-if="tabIndex===2" :customer="$route.query.merchantNo"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane :label="'授信额度'">
        <tab-credit-list v-if="tabIndex === 3" :isDetail="$route.query.from"></tab-credit-list>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
  import TabBankAccountInfo from '@/pages/customer-manage/company-customer/company-add/tab-bank-account-info';
  import TableCompanyMerchantBasic from '@/components/detail-company-merchant-basic'; // 选择公司详情信息
  import tabModalCar from '../page-distributor-car'; // 车型管理
  import tabCreditList from '../../distributor-credit-list'; // 授信管理列表
  export default {
    name: 'distributorDetails',
    components: {
      tabModalCar,
      tabCreditList,
      TabBankAccountInfo,
      'modal-company-merchant-basic': TableCompanyMerchantBasic
    },
    data() {
      return {
        tabIndex: 0
      };
    },
    computed: {
    },
    mounted() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
