<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>
        <span v-if="customerType=='1'">个人业务登记</span>
        <span v-else-if="customerType=='2'">公司业务登记</span>
      </i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <modal-personal-basic :customerType="customerType" ref="personalInfo" @personalData="getPersonalData"></modal-personal-basic>
      </i-tab-pane>
      <!--<i-tab-pane :label="'审批信息'">
        <modal-personal-approval></modal-personal-approval>
      </i-tab-pane>-->
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveDraft" :loading="initFormLoading" type="primary">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 保存草稿</span>
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
  import modalPersonalBasic from '../loan-apply-info/index.vue';
  /*import modalPersonalApproval from './personal-approval';*/
  export default {
    name: 'personalBbusinessRegistration',
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false,
        personalData: {}
      };
    },
    components: {
      'modal-personal-basic': modalPersonalBasic
      // 'modal-personal-approval': modalPersonalApproval
    },
    props: {
      customerType: String
    },
    mounted() {
    },
    methods: {
      // 保存的ajax
      async saveLoanBiz(_data) {
        this.$data.initFormLoading = true;
        let resp = await this.$http.post('/biz/saveLoanBiz', _data);
        this.$data.initFormLoading = false;
        if (resp.success) {
          this.$Message.success('保存成功');
        }
      },
      // 监听子组件（基本信息）传递数据到父组件
      getPersonalData(msg) {
        this.$data.personalData = msg;
      },
      // 保存草稿
      saveDraft() {
        if (this.$refs['personalInfo'].verification()) {
          // console.log(this.$data.personalData);
          let _dataTemp = $.extend({}, this.$data.personalData);
          _dataTemp.loanVO.status = '3';
          this.saveLoanBiz(_dataTemp);
        } else {
        }
      },
      // 提交
      saveSubimt() {
        if (this.$refs['personalInfo'].verification()) {
          // console.log(this.$data.personalData);
          let _dataTemp = $.extend({}, this.$data.personalData);
          _dataTemp.loanVO.status = '2';
          this.saveLoanBiz(_dataTemp);
        } else {
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
