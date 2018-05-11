<template>
  <section>
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/pages/query-service/repay-ment">业务查询</i-breadcrumb-item>
      <i-breadcrumb-item href="/pages/query-service/repay-ment">还款查询</i-breadcrumb-item>
      <i-breadcrumb-item>详情</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      贷款信息
    </div>
      <section style="position: relative; min-height: 200px;">
        <i-form :label-width="120" label-position="right">
          <i-row>
            <i-col span="8">
              <i-form-item label="订单编号">{{tabIndex}}</i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="订单时间">{{tabIndex}}</i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="会员编号">{{tabIndex}}</i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="会员编号">{{tabIndex}}</i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </section>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px; position: relative">
      <i-tab-pane :label="'资金方还款计划'">
        <tab-backmoeny-info v-if="tabIndex === 0"></tab-backmoeny-info>
      </i-tab-pane>
      <i-tab-pane :label="'海乐行租金计划'">
        <tab-rentmoeny-info v-if="tabIndex === 1"></tab-rentmoeny-info>
      </i-tab-pane>
      <i-tab-pane :label="'客户付款汇总计划'">
        <tab-paymentmoeny-info v-if="tabIndex === 2"></tab-paymentmoeny-info>
      </i-tab-pane>
    </i-tabs>
  </section>
</template>

<script>
//  import TabOrderInfo from './tab-order-info';
//  import TabVerifyInfo from './tab-verify-info';
  export default {
    name: 'personDetails',
    data() {
      return {
        tabIndex: 0
      };
    },
    components: {
    }
  };
</script>

<style scoped>

</style>
