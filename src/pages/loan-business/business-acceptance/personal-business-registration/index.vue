<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <modal-personal-basic></modal-personal-basic>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <div>12321321</div>
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
  export default {
    name: 'personalBbusinessRegistration',
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false
      };
    },
    components: {
      'modal-personal-basic': modalPersonalBasic
    },
    mounted() {
    },
    methods: {
      // 保存草稿
      saveDraft() {},
      // 提交
      saveSubimt() {}
    }
  };
</script>
<style lang="scss" scoped>
</style>
