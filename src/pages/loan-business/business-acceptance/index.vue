
<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>
        <span v-if="customerType=='1'">个人业务登记</span>
        <span v-else-if="customerType=='2'">公司业务登记</span>
      </i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <loan-apply-info :customerType="applyBasicInfo ? applyBasicInfo.custType : customerType"
                         :readonly="readonly"
                         :applyBasicInfo="applyBasicInfo" ref="personalInfo"
                         @personalData="getPersonalData">
        </loan-apply-info>
      </i-tab-pane>
      <!--<i-tab-pane :label="'审批信息'">
        <modal-personal-approval></modal-personal-approval>
      </i-tab-pane>-->
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveDraft" :loading="initFormLoading" type="primary">
        <span v-if="!initFormLoading"><i class="iconfont icon-baocun"></i> 保存草稿</span>
        <span v-else> loading...</span>
      </i-button>
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </div>
</template>

<script>
  import bus from '@/bus';
  import LoanApplyInfo from '../loan-apply-info/index.vue';
  /* import modalPersonalApproval from './personal-approval';*/
  export default {
    name: 'personalBbusinessRegistration',
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false,
        personalData: {},
        applyBasicInfo: null,
        readonly: false
      };
    },
    components: {
      LoanApplyInfo
    },
    props: {
      customerType: String
    },
    methods: {
      // 保存的ajax
      async saveLoanBiz(_data) {
        this.$data.initFormLoading = true;
        let resp = await this.$http.post('/biz/saveLoanBiz', _data);
        this.$data.initFormLoading = false;
        if (resp.success) {
          this.$Message.success('保存成功');
          this.$router.push({
            name: 'loanBusinessList'
          });
        }
      },
      // 监听子组件（基本信息）传递数据到父组件
      getPersonalData(msg) {
        this.$data.personalData = msg;
      },
      // 保存草稿
      saveDraft() {
        let vmApplyInfo = this.$refs['personalInfo'];
        if (vmApplyInfo.validate()) {
          let _dataTemp = vmApplyInfo.getApplyData();
          _dataTemp.loanVO.status = '3';
          _dataTemp.opeType = '1';
          this.saveLoanBiz(_dataTemp);
        }
      },
      // 提交
      saveSubimt() {
        let vmApplyInfo = this.$refs['personalInfo'];
        if (vmApplyInfo.validate()) {
          let _dataTemp = vmApplyInfo.getApplyData();
          _dataTemp.loanVO.status = '2';
          _dataTemp.opeType = '2';
          // 验证审核意见
          if (!this.$refs.personalInfo.validateResultTest()) {
            return;
          }
          this.saveLoanBiz(_dataTemp);
        }
      },
      // 如果是修改或者删除，初始化页面数据
      async initPage() {
        let loanNo = this.$route.query.id;
        let isFromDetail = this.$route.query.from === 'detail';
        if (loanNo) {
          let resp = await this.$http.post('/biz/getLoanBizByLoanNo', {
            loanNo
          });
          if (resp.success) {
            this.$data.applyBasicInfo = resp.body;
          }
        } else {
          this.$data.applyBasicInfo = null;
        }
        if (isFromDetail) {
          this.$data.readonly = isFromDetail;
        } else {
          this.$data.readonly = false;
        }
      }
    },
    mounted() {
      this.initPage();
      // 文件上传完成的回调
      bus.$on('loanFileUploading', (e) => {
        this.$data.initFormLoading = e;
      });
    },
    watch: {
      '$route.query': {
        handler(newVal, oldVal) {
          this.initPage();
        },
        deep: true
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
