<template>
  <div id="">
    <i-form ref="creditPlanForm" :model="creditPlan" :label-width="120" label-position="right">
      <i-row>
        <i-col span="8">
          <i-form-item label="产品名称" prop="productNo"
            :rules="{required: true, message: '请选择产品'}">
            <input type="hidden" v-model="creditPlan.productNo">
            <i-input :readonly="true" v-model="creditPlan.productName">
              <i-button slot="append" @click="selectProductModal=!selectProductModal">选择产品 <i-icon type="ios-more"></i-icon></i-button>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="单笔额度上限" prop="singleLimitAmt"
                       :rules="{required: true, message: '请输入单笔额度上限'}">
            <i-input :readonly="detail" v-model="creditPlan.singleLimitAmt">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="还款方式" prop="repayMode"
                       :rules="{required: true, message: '请选择还款方式'}">
            <i-select :disabled="detail" v-model="creditPlan.repayMode">
              <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
            <!--{{enumCode2Name(creditInfo.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}-->
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="是否可提前还款" prop="isPrepayment"
                       :rules="{required: true, message: '请选择是否可提前还款'}">
            <i-select :disabled="detail" v-model="creditPlan.isPrepayment">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
            <!--{{enumCode2Name(creditInfo.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}-->
          </i-form-item>
        </i-col>
        <i-col span="8" v-if="creditPlan.isPrepayment=='1'">
          <i-form-item label="提前还款利息方式" prop="prepaymentAccrualMode"
                       :rules="{required: true, message: '请选择提前还款利息方式'}">
            <i-select :disabled="detail" v-model="creditPlan.prepaymentAccrualMode">
              <i-option v-for="item in enumSelectData.get('PrePayMentAccrualModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="保证金比例%">
            <i-input :readonly="detail" v-model="creditPlan.bailRatio"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="24">
          <i-form-item label="风控措施">
            <i-input :readonly="detail" type="textarea" v-model="creditPlan.riskControl" :rows="4"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <bs-form-child-title style="margin:10px 0" title="用款费率"></bs-form-child-title>
      <div class="form-top-actions" v-if="!detail">
        <i-button type="primary" @click="addCreditPlanRateModal = !addCreditPlanRateModal">添加用款费率</i-button>
      </div>
      <i-table :columns="creditPlanRateCol" :data="creditPlan.creditPlanRateList"></i-table>
      <bs-form-child-title style="margin:10px 0" title="放款前提"></bs-form-child-title>
      <div class="form-top-actions" v-if="!detail">
        <i-button type="primary" @click="addCreditLoanReadyModal = !addCreditLoanReadyModal">添加放款前提</i-button>
      </div>
      <i-table :columns="creditLoanReadyCol" :data="creditPlan.creditLoanReadyList"></i-table>
      <i-row style="margin-top: 15px;" v-if="!detail">
        <i-col span="24">
          <i-button type="primary" @click="submitCreditPlan" style="width: 120px;">提交</i-button>
        </i-col>
      </i-row>
    </i-form>
    <!--添加用款费率的模态框-->
    <bs-modal v-model="addCreditPlanRateModal" :width="520" title="添加用款费率">
      <i-form ref="creditRateForm" :model="creditRateForm" :label-width="150" label-position="right">
        <i-form-item label="期限" prop="periods"
                     :rules="{required: true, message: '请输入期限'}">
          <i-input v-model="creditRateForm.periods"></i-input>
        </i-form-item>
        <i-form-item label="资金方收取年利率%" prop="capitalYearRate"
                     :rules="{required: true, message: '请输入资金方收取年利率'}">
          <i-input v-model="creditRateForm.capitalYearRate">
            <span slot="append">%</span>
          </i-input>
        </i-form-item>
        <i-form-item label="颂车收取手续费率%" prop="scPoundageRate"
                     :rules="{required: true, message: '请输入颂车收取手续费率'}">
          <i-input v-model="creditRateForm.scPoundageRate"><span slot="append">%</span></i-input>
        </i-form-item>
        <i-form-item label="收款方式" prop="payMode"
                     :rules="{required: true, message: '请选择收款方式'}">
          <i-select v-model="creditRateForm.payMode">
            <i-option v-for="item in enumSelectData.get('ReceiveTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="">
          <i-button type="primary" @click="submitReditRate">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加放款前提模态框-->
    <bs-modal v-model="addCreditLoanReadyModal" :width="520" title="添加用款费率">
      <i-form ref="creditReadyForm" :model="readyForm" :label-width="120" label-position="right">
        <i-form-item label="内容" prop="readyContent"
                     :rules="{required: true, message: '请输入内容'}">
          <i-input v-model="readyForm.readyContent" type="textarea" :rows="4"></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button type="primary" @click="submitCreditReady">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <bs-modal v-model="selectProductModal" :width="1200" title="选择产品">
      <table-product-list @on-row-dbclick="selectProduct" type="model"></table-product-list>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import TableProductList from '@/pages/configuration-manage/manage-product/product-list'; // 选择产品
  export default {
    name: 'creditPlanForm',
    mixins: [MixinData],
    data() {
      return {
        creditRateForm: {
          'periods': '',
          'capitalYearRate': '',
          'scPoundageRate': '',
          'payMode': ''
        },
        readyForm: {
          readyContent: ''
        }
      };
    },
    props: {
      detail: {
        type: Boolean,
        default: false,
        required: false
      },
      edit: {
        type: Boolean,
        default: false,
        required: false
      },
      initData: {
        type: Object,
        required: false
      }
    },
    methods: {
      submitReditRate() {
        this.$refs['creditRateForm'].validate(valid => {
          if (valid) {
            this.$data.addCreditPlanRateModal = false;
            this.$data.creditPlan.creditPlanRateList.push($.extend({}, this.$data.creditRateForm));
            setTimeout(() => {
              this.$refs['creditRateForm'].resetFields();
            }, 500);
          }
        });
      },
      submitCreditReady() {
        this.$refs['creditReadyForm'].validate(valid => {
          if (valid) {
            this.$data.creditPlan.creditLoanReadyList.push($.extend({}, this.$data.readyForm));
            this.$data.addCreditLoanReadyModal = false;
            setTimeout(() => {
              this.$refs['creditReadyForm'].resetFields();
            }, 500);
          }
        });
      },
      selectProduct(row, index) {
        this.$data.creditPlan.productNo = row.productNo;
        this.$data.creditPlan.productName = row.productName;
        this.$data.selectProductModal = false;
      },
      // 提交表单
      submitCreditPlan() {
        this.$refs['creditPlanForm'].validate(valid => {
          if (valid) {
            this.$emit('on-submit', this.$data.creditPlan);
          }
        });
      }
    },
    components: {
      BsModal,
      TableProductList
    },
    mounted() {
      setTimeout(() => {
        if (this.detail || this.edit) {
          this.$data.creditPlan = $.extend({}, this.initData);
        } else {
          this.$refs['creditPlanForm'].resetFields();
        }
      }, 1000);
    }
  };
</script>
<style lang="scss" scoped="">

</style>
