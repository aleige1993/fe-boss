<template>
  <section>
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/toLeftNav">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>客户意向订单详情</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px; position: relative">
      <i-tab-pane :label="'订单信息'">
        <tab-order-info v-if="tabIndex === 0"></tab-order-info>
      </i-tab-pane>
      <i-tab-pane :label="'验身信息'">
        <tab-verify-info v-if="tabIndex === 1"></tab-verify-info>
      </i-tab-pane>
    </i-tabs>
  </section>
</template>

<script>
  import TabOrderInfo from './tab-order-info';
  import TabVerifyInfo from './tab-verify-info';
  export default {
    name: 'intentionOrderDetail',
    data() {
      return {
        tabIndex: 0
      };
    },
    components: {
      TabOrderInfo,
      TabVerifyInfo
    }
  };
</script>

<style scoped>

</style>
