<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane :label="'基本信息'">
        <modal-personal-basic></modal-personal-basic>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <div>12321321</div>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
  import modalPersonalBasic from './personal-basic';
  export default {
    name: 'personalBbusinessRegistration',
    data() {
      return {
        tabIndex: 0
      };
    },
    components: {
      'modal-personal-basic': modalPersonalBasic
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
</style>
