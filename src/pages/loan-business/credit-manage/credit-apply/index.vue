<template>
  <div id="credit-apply">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>{{id ? '授信信息修改' : '授信申请'}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :corpNo="applyData.creditApplyParam.corpNo" @on-select-company="selectCompany"></company-customer-basic-info>
        <i-form v-if="applyData.creditApplyParam.corpNo !==''" label-position="right" :label-width="140">
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="24">
                <i-form-item label="意见信息">
                  <input type="hidden" v-model="applyData.creditAuditParam.approveStatus">
                  <i-input v-model="applyData.creditAuditParam.opinion" type="textarea" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <div class="form-footer-actions">
            <i-button :loading="submitApplyLoading" @click="submitCreditApply" type="success">
              <span v-if="!submitApplyLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
              <span v-else> 处理中</span>
            </i-button>
          </div>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <div v-if="tabIndex==1">
          <approve-history :id="applyData.creditApplyParam.creditApplyNo"></approve-history>
        </div>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '@/components/detail-company-customer-basic/index.vue';
  import ApproveHistory from '../credit-approve-history/index.vue';
  export default {
    name: 'creditApply',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        tabIndex: 0,
        initPageLoading: false,
        loadingAttachFile: false,
        submitApplyLoading: false,
        initFormLoading: false,
        addFirstApproveModal: false,
        addOutApproveModal: false,
        attachFormData: {
          attachName: '',
          attachUrl: ''
        }
      };
    },
    computed: {
      id() {
        return this.$route.query.id || null;
      }
    },
    methods: {

    },
    mounted() {
      this.initPage();
    },
    components: {
      CompanyCustomerBasicInfo,
      'bs-modal': BsModal,
      ApproveHistory
    }
  };
</script>
<style lang="scss" scoped="">

</style>
