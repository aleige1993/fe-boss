<template>
  <div id="" style="position:relative">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/financemanage">财务管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/financemanage/proxypay">代付管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="paymentType === '1'">一次放款</i-breadcrumb-item>
      <i-breadcrumb-item v-else>二次放款</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="云贷">
        <proxy-pay-list  v-if="tabIndex === 0" :paymentType="paymentType" :flag="'1'"></proxy-pay-list>
      </i-tab-pane>
      <i-tab-pane label="宝付">
        <proxy-pay-list  v-if="tabIndex === 1" :paymentType="paymentType" :flag="'0'"></proxy-pay-list>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  /* global Alertify */
  import ProxyPayList from './list';
  export default {
    name: 'modifyPrivateCustomer',
    data() {
      return {
        tabIndex: 0
      };
    },
    props: {
      paymentType: {
        type: String,
        default: '',
        required: false
      }
    },
    components: {
      ProxyPayList
    },
    watch: {
      'paymentType'(newVal) {
        this.$data.tabIndex = 0;
      }
    },
    methods: {
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
</style>
