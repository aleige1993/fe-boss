<template>
  <div id="credit-paln-list" class="relative" style="position: relative">
    <i-form :label-width="120" label-position="right">
      <!--最终审核信息-->
      <bs-form-block title="授信方案">
        <i-row>
          <i-col span="8">
            <i-form-item label="授信总额度">
              <span>{{creditLimitParam.totalLimitAmt}}元</span>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="额度释放方式">
              {{enumCode2Name(creditLimitParam.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="授信起始日期">
              <span v-text="creditLimitParam.startDate"></span>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="授信到期日期">
              <span v-text="creditLimitParam.endDate"></span>
            </i-form-item>
          </i-col>

        </i-row>
      </bs-form-block>
      <!--用信方案-->
      <template v-for="creditPlan in planList">
        <bs-form-block :title="creditPlan.productName+' - 额度用信方案'">
          <i-row>
            <i-col span="8">
              <i-form-item label="产品名称">
                <input type="hidden" v-model="creditPlan.productNo">
                <span v-text="creditPlan.productName"></span>
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="单笔额度上限">
                <span>{{creditPlan.singleLimitAmt}}元</span>
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="还款方式">
                {{enumCode2Name(creditPlan.repayMode, 'RepaymentTypeEnum')}}
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="8">
              <i-form-item label="是否可提前还款">
                {{enumCode2Name(creditPlan.isPrepayment, 'YesNoEnum')}}
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="提前还款利息方式">
                {{enumCode2Name(creditPlan.prepaymentAccrualMode, 'PrePayMentAccrualModeEnum')}}
              </i-form-item>
            </i-col>
            <i-col span="8">
              <i-form-item label="保证金比例%">
                <span v-text="creditPlan.bailRatio"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="24">
              <i-form-item label="风控措施">
                <span v-text="creditPlan.riskControl"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <bs-form-child-title style="margin:10px 0" title="用款费率"></bs-form-child-title>
          <i-table :columns="creditPlanRateCol" :data="creditPlan.creditPlanRateList"></i-table>
          <bs-form-child-title style="margin:10px 0" title="放款前提"></bs-form-child-title>
          <i-table :columns="creditLoanReadyCol" :data="creditPlan.creditLoanReadyList"></i-table>
        </bs-form-block>
      </template>
    </i-form>
    <i-spin size="large" v-if="loadingPage" fixed></i-spin>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  export default {
    name: 'creditPlanList',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        loadingPage: false
      };
    },
    props: ['creditLimitParam'],
    mounted() {
      this.initPage();
    }
  };
</script>
<style lang="scss" scoped="">

</style>