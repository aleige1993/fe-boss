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
    name: 'TabCompanyCustomerAddBusinessContactInfo',
    mixins: [MixinData, MixinComputed],
    data() {
      return {
        dataLoading: false
      };
    },
    props: ['customer'],
    methods: {
      async getBusinessContactList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/corp/listCorpBiz', {
          corpNo: this.corpNo,
          currentPage: 1,
          pageSize: 9999
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.currentInfoDatas = resp.body.resultList;
        }
      },
      async getThirtyPartList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/corp/listCorpPawn', {
          corpNo: this.corpNo,
          currentPage: 1,
          pageSize: 9999
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.thirdPartyProofDatas = resp.body.resultList;
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
