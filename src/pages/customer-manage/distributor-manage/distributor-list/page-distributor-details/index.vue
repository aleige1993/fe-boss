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
        <modal-company-merchant-basic ref="personalInfo"></modal-company-merchant-basic>
      </i-tab-pane>
      <i-tab-pane :label="'车型管理'">
      </i-tab-pane>
      <i-tab-pane :label="'银行账户信息'">
      </i-tab-pane>
      <i-tab-pane :label="'授信管理'">
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
  import TableCompanyMerchantBasic from '@/components/detail-company-merchant-basic'; // 选择公司详情信息
  export default {
    name: 'distributorDetails',
    components: {
      'modal-company-merchant-basic': TableCompanyMerchantBasic
    },
    data() {
      return {
        tabIndex: 0
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
