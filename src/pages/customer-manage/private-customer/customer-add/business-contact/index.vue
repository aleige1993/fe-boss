<template>
  <div id="add-customer-business-contact">
    <i-tabs :animated="false">
      <i-tab-pane label="当前信息">
        <i-table :height="tableFixHeight+80" :loading="dataLoading" :columns="currentInfoColumns" :data="currentInfoDatas"></i-table>
      </i-tab-pane>
      <i-tab-pane label="作为第三方保证">
        <i-table :height="tableFixHeight+80" :loading="dataLoading" :columns="thirdPartyProofColumns" :data="thirdPartyProofDatas"></i-table>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinComputed from '../mixin-tab-computed';
  export default {
    name: 'TabPrivateCustomerAddBusinessContactInfo',
    mixins: [MixinData, MixinComputed],
    data() {
      return {
        dataLoading: false
      };
    },
    methods: {
      async getBusinessContactList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/business/list', {
          memberNo: this.memberNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.currentInfoDatas = resp.body;
        }
      },
      async getThirtyPartList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/third/party/list', {
          memberNo: this.memberNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.thirdPartyProofDatas = resp.body;
        }
      }
    },
    mounted() {
      this.getBusinessContactList();
      this.getThirtyPartList();
    }
  };
</script>
<style lang="scss">

</style>
