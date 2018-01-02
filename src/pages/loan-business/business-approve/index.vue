<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>{{breadCrumbName}} {{applyInfoReadonly}} {{firstApproveInfoReadonly}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <apply-info ref="applyInfo" :customerType="'1'" :applyBasicInfo="formData" :loanAction="'firstApprove'" :readonly="applyInfoReadonly"></apply-info>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <approve-info ref="approveInfo" :applyBasicInfo="formData" :readonly="firstApproveInfoReadonly"></approve-info>
      </i-tab-pane>
      <i-tab-pane label="人行征信报告">
        <iframe v-if="tabIndex == 2" src="http://www.baidu.com" width="100%" :height="iframeHeight" frameborder="0"></iframe>
      </i-tab-pane>
      <i-tab-pane label="芝麻信用报告">
        <iframe v-if="tabIndex == 3" src="http://www.songchedai.com" width="100%" :height="iframeHeight" frameborder="0"></iframe>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-big-data v-if="tabIndex == 4"></tab-big-data>
      </i-tab-pane>
      <i-tab-pane :label="'审核历史意见'">
        <approve-history v-if="tabIndex == 5"></approve-history>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="submitLoanApprove" :loading="submitApproveLoading" type="success">
        <span v-if="!submitApproveLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import BsModal from '@/components/bs-modal';
  import PrivateCustomerList from '@/components/table-customer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsCarPicker from '@/components/bs-carpicker/index.vue';
  import personalInfo from '@/components/detail-personal-customer-basic/index.vue';
  import companyCustomerInfo from '@/components/detail-company-customer-basic/index.vue';
  import TabApplyBasicInfo from '../loan-apply-info/index.vue';
  import TabApproveInfo from './tab-approve-info/index.vue';
  import TabApproveHistory from './tab-approve-history/index.vue';
  import TabBigData from './tab-big-data/index.vue';
  export default {
    name: 'loanBusinessApprove',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        iframeHeight: 460,
        tabIndex: 0,
        initFormLoading: false,
        submitApproveLoading: false,
        memberNo: '1',
        corpNo: '1'
      };
    },
    computed: {
      breadCrumbName() {
        let loanNode = this.$route.query.status;
        if (loanNode === '3') {
          return '业务初审';
        } else if (loanNode === '4') {
          return '业务一级审批';
        } else {
          return '业务二级审批';
        }
      },
      applyInfoReadonly() {
        let loanNode = this.$route.query.status;
        return loanNode === '4' || loanNode === '5';
      },
      firstApproveInfoReadonly() {
        let loanNode = this.$route.query.status;
        return loanNode === '4' || loanNode === '5';
      }
    },
    props: {
      customerType: {
        type: String,
        default: '1',
        required: false
      }
    },
    components: {
      personalInfo,
      companyCustomerInfo,
      TableCompanyCustomerList,
      BsModal,
      'bs-carpicker': BsCarPicker,
      'table-customer-list': PrivateCustomerList,
      'apply-info': TabApplyBasicInfo,
      'approve-info': TabApproveInfo,
      'approve-history': TabApproveHistory,
      'tab-big-data': TabBigData
    },
    methods: {
      // 选择权利人
      selectObligeeRow(row, index) {
        // console.log(row);
        this.$data.formCar.carOwnerName = row.name;
        this.$data.formCar.carOwnerNo = row.memberNo;
        this.$data.showSelectObligee = false;
      },
      selectCompanyOwnerRow(row, index) {
        this.$data.formCar.carOwnerName = row.corpName;
        this.$data.formCar.carOwnerNo = row.corpNo;
        this.$data.showSelectCompanyOwner = false;
      },
      // 选择担保人
      selectGuaRow(row, index) {
        // console.log(row);
        this.$data.formAssure.guaPersonCertNo = row.certNo;
        this.$data.formAssure.guaPersonNo = row.memberNo;
        this.$data.formAssure.guaPersonName = row.name;
        this.$data.showSelectGua = false;
      },
      selectCompanyGuaRow(row, index) {
        this.$data.formAssure.guaPersonCertNo = row.creditCode;
        this.$data.formAssure.guaPersonNo = row.corpNo;
        this.$data.formAssure.guaPersonName = row.corpName;
        this.$data.showSelectCompanyGua = false;
      },
      saveSubimt() {
        // a
      }
    },
    mounted() {
      this.$data.iframeHeight = $(window).height() - 280;
      this.initPage();
    }
  };
</script>
<style lang="scss" scoped="">

</style>
