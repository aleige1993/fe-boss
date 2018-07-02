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
        <i-form label-position="right" :label-width="140">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="6">
                <i-form-item label="项目编号">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="客户名称">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="证件号码">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="客户电话">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
            </i-row>

            <i-row>
              <i-col span="6">
                <i-form-item label="产品名称">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="放款日期">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="贷款期数">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="贷款金额">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
            </i-row>

            <i-row>
              <i-col span="6">
                <i-form-item label="逾期金额">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="逾期期数">
                  <span>{{tabIndex}}</span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="贷款状态">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="资方名称">
                  <span v-text="tabIndex"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </section>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px; position: relative">
      <i-tab-pane :label="'资金方还款计划'">
        <i-table v-if="tabIndex==0" :height="tableFixHeight" :loading="dataLoading"   border ref="selection" :columns="backmoenyColumns" :data="backmoenyList"></i-table>
      </i-tab-pane>
      <i-tab-pane :label="'海乐行租金计划'">
        <i-table v-if="tabIndex==1" :height="tableFixHeight" :loading="dataLoading"   border ref="selection" :columns="rentmoenyColumns" :data="rentmoenyList"></i-table>
      </i-tab-pane>
      <i-tab-pane :label="'客户付款汇总计划'">
        <i-table v-if="tabIndex==2" :height="tableFixHeight" :loading="dataLoading"   border ref="selection" :columns="paymentmoenyColumns" :data="paymentmoenyList"></i-table>
      </i-tab-pane>
    </i-tabs>
  </section>
</template>

<script>
  import backmoenyData from './backmoeny-data';
  import rentmoenyData from './rentmoeny-data';
  import paymentmoenyData from './paymentmoeny-data';
  export default {
    name: 'personDetails',
    mixins: [backmoenyData, paymentmoenyData, rentmoenyData],
    data() {
      return {
        tabIndex: 0,
        dataLoading: false,
        backmoenyList: [],
        rentmoenyList: [],
        paymentmoenyList: []
      };
    },
    components: {
    }
  };
</script>

<style scoped>

</style>
