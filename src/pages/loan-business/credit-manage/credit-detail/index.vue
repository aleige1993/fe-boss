<template>
  <div id="credit-detail">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信详情</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :readonly="true" :corpNo="creditInfo.corpNo"></company-customer-basic-info>
        <i-form label-position="right" :label-width="140">
          <!--初审信息-->
          <bs-form-block title="初审信息">
            <i-row>
              <i-col span="24">
                <i-table :columns="firstApproveColumns" :data="creditInfo.firstTrialDTO.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--外审信息-->
          <bs-form-block title="现场尽调信息">
            <i-row>
              <i-col span="24">
                <i-table :columns="outApproveColumns" :data="creditInfo.externalAuditDTOList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="授信与用信方案">
        <credit-plan-list v-if="tabIndex==1" :creditLimitParam="creditInfo.creditLimit"></credit-plan-list>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <div v-if="tabIndex==2 && creditInfo.creditLimitApplyNo">
          <approve-history :id="creditInfo.creditLimitApplyNo"></approve-history>
        </div>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '@/components/detail-company-customer-basic/index.vue';
  import ApproveHistory from '../credit-approve-history/index.vue';
  import CreditPlanList from '../credit-approve/credit-plan-list/index.vue';
  export default {
    name: 'creditDetail',
    mixins: [MixinData],
    data() {
      return {
        tabIndex: 0,
        pageLoading: false,
        loadingAttachFile: false
      };
    },
    methods: {
      async getCreditInfo() {
        let resp = await this.$http.post('/credit/find', { creditLimitApplyNo: this.$route.query.id });
        if (resp.success) {
          this.$data.creditInfo = resp.body;
        }
      }
    },
    components: {
      CompanyCustomerBasicInfo,
      'bs-modal': BsModal,
      ApproveHistory,
      CreditPlanList
    },
    async mounted() {
      await bsWait(500);
      this.getCreditInfo();
    }
  };
</script>
<style lang="scss" scoped="">

</style>
