<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>{{breadCrumbName}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <apply-info ref="applyInfo" :customerType="formData.custType" :applyBasicInfo="formData" :loanAction="'firstApprove'" :readonly="applyInfoReadonly || isFromDetail" @on-approve-info="approveInfoRefresh"></apply-info>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'" v-if="taskNode !== '1' && taskNode !== '0'">
        <approve-info ref="approveInfo" :applyBasicInfo="formData"
                      :readonly="firstApproveInfoReadonly || isFromDetail" :isApprove="isApprove">
        </approve-info>
      </i-tab-pane>
      <i-tab-pane label="人行征信报告" :disabled="formData.custType === '2'">
        <i-checkbox v-if="showCreditCheckbox" v-model="isHasCheckCreditReport">&nbsp;&nbsp;已查看征信报告</i-checkbox>
        <div v-if="isCreditEerror" style="color: red; padding: 20px 0">暂无征信查询结果！</div>
        <br>
        <br>
        <iframe style="border:1px solid #f5f5f5" v-if="tabIndex == 2" :src="creditReportURL" width="100%" :height="iframeHeight" frameborder="0"></iframe>
      </i-tab-pane>
      <i-tab-pane label="联系人信息">
        <tab-big-data :customerType="formData.custType" :applyBasicInfo="formData" v-if="tabIndex == 3"></tab-big-data>
      </i-tab-pane>
      <i-tab-pane :label="'审核历史意见'">
        <approve-history v-if="tabIndex == 4"></approve-history>
      </i-tab-pane>
    </i-tabs>
    <div v-if="!isFromDetail" class="form-footer-actions">
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
    data() {
      return {
        isHasCheckCreditReport: false, // 是否征信报告
        showCreditCheckbox: true, // 显示 已查看征信报告按钮
        isCreditEerror: false, // 暂无征信查询结果 时显示
        iframeHeight: 460,
        tabIndex: 0,
        initFormLoading: false,
        submitApproveLoading: false,
        memberNo: '1',
        corpNo: '1',
        creditReportURL: ''
      };
    },
    computed: {
      taskNode() {
        return this.$route.query.status;
      },
      breadCrumbName() {
        return this.enumCode2Name(this.taskNode, 'LoanBizNodeEnum');
      },
      isApprove() {
        let loanNode = this.$route.query.status;
        return loanNode === '3' || loanNode === '4' || loanNode === '5';
      },
      applyInfoReadonly() {
        let loanNode = this.$route.query.status;
        return loanNode === '4' || loanNode === '5';
      },
      firstApproveInfoReadonly() {
        let loanNode = this.$route.query.status;
        return loanNode === '4' || loanNode === '5';
      },
      isFromDetail() {
        return location.href.indexOf('detail') !== -1;
      }
    },
    props: {
      customerType: {
        type: String,
        default: '1',
        required: false
      }
    },
    methods: {
      // 经过“基本信息”组件通知父组件 去执行“审核信息”组件中的方法
      approveInfoRefresh(NewCustLevel) {
        // this.$refs.approveInfo.getPageInitData();
        this.$refs.approveInfo.custLevelEmitFun(NewCustLevel);
      },
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
