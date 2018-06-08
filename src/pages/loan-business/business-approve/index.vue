<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>{{breadCrumbName}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'" name="tabBasicInfo" v-if="approveHistoryData">
        <apply-info v-if="tabIndex === 'tabBasicInfo'" ref="applyInfo"
                    :customerType="formData.custType"
                    :applyBasicInfo="formData" :loanAction="'firstApprove'"
                    :readonly="applyInfoReadonly || isFromDetail" @on-approve-info="approveInfoRefresh">
        </apply-info>
      </i-tab-pane>
      <i-tab-pane label="人行征信报告" name="tabCreditInfo" v-if="approveHistoryData && ((taskNode !== '1' && taskNode !== '0') || isContainApproveCheck) && !isRecordRole" :disabled="formData.custType === '2'">
        <div v-if="tabIndex === 'tabCreditInfo'">
          <i-checkbox v-if="showCreditCheckbox" v-model="isHasCheckCreditReport">&nbsp;&nbsp;已查看征信报告</i-checkbox>

          <div v-if="isCreditEerror" style="color: red; padding: 20px 0">暂无征信查询结果！</div>
          <br>
          <br>
          <p style="text-align: center;background: #f7f7f7;">
            <span style="color: #f89406;font-size: 14px;line-height: 30px;" v-if="creditReportURLLoading"><Icon style="vertical-align: middle" type="load-c" size=14 class="demo-spin-icon-load"></Icon> 人行征信报告生成中...</span>
          </p>
          <iframe style="border:1px solid #f5f5f5" :src="creditReportURL" width="100%" :height="iframeHeight" frameborder="0"></iframe>
        </div>
      </i-tab-pane>
      <i-tab-pane label="联系人信息" name="tabContactInfo" v-if="approveHistoryData">
        <tab-big-data :customerType="formData.custType" :applyBasicInfo="formData" v-if="tabIndex === 'tabContactInfo'"> </tab-big-data>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'" name="tabApproveInfo" v-if="approveHistoryData && ((taskNode !== '1' && taskNode !== '0') || isContainApproveCheck) && !isRecordRole">
        <approve-info v-if="tabIndex === 'tabApproveInfo'" ref="approveInfo" :applyBasicInfo="formData" :isFromDetail="isFromDetail"
                      @on-result-change="approveResultChanged"
                      :readonly="firstApproveInfoReadonly || isFromDetail" :isApprove="isApprove">
        </approve-info>
      </i-tab-pane>
      <i-tab-pane  name="tabApproveHistory":label="'审核历史意见'" v-if="approveHistoryData">
        <approve-history v-if="tabIndex === 'tabApproveHistory'" :data="approveHistoryData"> </approve-history>
      </i-tab-pane>
    </i-tabs>
    <div v-if="!isFromDetail" class="form-footer-actions">
      <i-button v-if="taskNode === '3'" @click="saveLoanApproveCraft" :loading="submitApproveLoading" type="primary">
        <span v-if="!submitApproveLoading"><i class="iconfont icon-baocun"></i> 保存草稿</span>
        <span v-else> loading...</span>
      </i-button>
      <i-button @click="submitLoanApprove" :loading="submitApproveLoading" type="success">
        <span v-if="!submitApproveLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </div>
</template>
<script>
  import bus from '@/bus';
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
        creditReportURLLoading: false,
        iframeHeight: 460,
        tabIndex: 'tabBasicInfo',
        initFormLoading: false,
        submitApproveLoading: false,
        memberNo: '1',
        corpNo: '1',
        creditReportURL: '',
        approveResult: '',
        approveHistoryData: '' // 审核历史意见
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
      },
      // 是否是录单岗
      isRecordRole() {
        let userRoles = this.$userLogin.getLoginInfo().roles;
        return userRoles.length === 1 && userRoles[0] === 48;
      },
      isContainApproveCheck() {
        let resArray = [];
        if (this.$data.approveHistoryData) {
          this.$data.approveHistoryData.map(item => {
            resArray.push(item.taskName);
          });
          return resArray.indexOf('3') > -1;
        }
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
        if (this.$refs.approveInfo) {
          this.$refs.approveInfo.custLevelEmitFun(NewCustLevel);
        }
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
      },
      approveResultChanged(result) {
        this.$data.approveResult = result;
      },
      async getHistoryInfo() {
        let _id = this.$route.query.id;
        if (_id && _id !== '') {
          this.$data.historyLoading = true;
          let resp = await this.$http.post('/biz/listApproveHistory', { loanNo: _id, pageSize: 9999, currentPage: 1 });
          this.$data.historyLoading = false;
          if (resp.success) {
            this.$data.approveHistoryData = resp.body.resultList;
          }
        } else {
          this.$data.approveHistoryData = [];
        }
      }
    },
    mounted() {
      this.$data.iframeHeight = $(window).height() - 280;
      this.initPage();
      this.getHistoryInfo();
      // 文件上传完成的回调
      bus.$on('loanFileUploading', (e) => {
        this.$data.submitApproveLoading = e;
      });
    }
  };
</script>
<style lang="scss" scoped="">

</style>
