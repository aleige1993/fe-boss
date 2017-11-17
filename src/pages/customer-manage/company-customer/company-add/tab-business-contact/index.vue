<template>
  <div id="add-customer-business-contact">
    <i-tabs :animated="false">
      <i-tab-pane label="当前信息">
        <i-table :columns="currentInfoColumns" :data="currentInfoDatas"></i-table>
      </i-tab-pane>
      <i-tab-pane label="作为第三方凭证">
        <i-table :columns="thirdPartyProofColumns" :data="thirdPartyProofDatas"></i-table>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'TabPrivateCustomerAddBusinessContactInfo',
    mixins: [MixinData],
    data() {
      return {};
    }
  };
</script>
<style lang="scss">

</style>
