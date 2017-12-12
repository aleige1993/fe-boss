<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务初审</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <modal-personal-basic ref="personalInfo" @personalData="getPersonalData"></modal-personal-basic>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <modal-personal-approval></modal-personal-approval>
      </i-tab-pane>
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
  import modalPersonalBasic from './personal-basic';
  import modalPersonalApproval from './personal-approval';
  export default {
    name: 'personalBbusinessRegistration',
    data() {
      return {
        taskNode: 2, // 1.未受理（点击草稿之后的），2.初审，3.一级审批，4.二级审批
        tabIndex: 0,
        initFormLoading: false,
        personalData: {}
      };
    },
    components: {
      'modal-personal-basic': modalPersonalBasic,
      'modal-personal-approval': modalPersonalApproval
    },
    mounted() {
    },
    methods: {
      // 保存的ajax
      async saveLoanBiz() {
        let resp = await this.$http.post('/biz/saveLoanBiz', this.$data.personalData);
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
          console.log(this.$data.personalData);
          this.saveLoanBiz();
        } else {
        }
      },
      // 提交
      saveSubimt() {}
    }
  };
</script>
<style lang="scss" scoped>
</style>
