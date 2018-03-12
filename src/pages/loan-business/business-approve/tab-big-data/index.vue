<template>
  <div id="">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.phoneNo" style="width: 240px" placeholder="联系人电话"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="searchContactBooks"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-tabs v-model="tabIndex" :animated="false">
      <!--<i-tab-pane label="业务往来"></i-tab-pane>
      <i-tab-pane label="作为第三方保证"></i-tab-pane>-->
      <i-tab-pane label="紧急联系人">
        <i-table :height="this.$store.getters.viewHeight" :loading="loadingContactBook" :columns="emergencyColumns" :data="emergencyDatas"></i-table>
      </i-tab-pane>
      <i-tab-pane label="电话本联系人">
        <i-table :height="this.$store.getters.viewHeight" :loading="loadingContactBook" :columns="contactBookColumns" :data="contactBookDatas"></i-table>
        <div class="page-container">
          <i-page @on-change="contactBooksPageChange" :total="contactBookTotal" :page-size="15" size="small" show-total></i-page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼入记录">
        <i-table :height="this.$store.getters.viewHeight" :loading="loadingContactBook" :columns="callInColumns" :total="callInTotal" :data="callInDatas"></i-table>
        <div class="page-container">
          <Page @on-change="callInPageChange" :total="callInTotal" :page-size="15" size="small" show-total></Page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼出记录">
        <i-table :height="this.$store.getters.viewHeight" :loading="loadingContactBook" :columns="callInColumns" :total="callOutTotal" :data="callOutDatas"></i-table>
        <div class="page-container">
          <Page @on-change="callOutPageChange" :total="callOutTotal" :page-size="15" size="small" show-total></Page>
        </div>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-method';
  export default {
    name: '',
    mixins: [MixinData, MixinMethods],
    props: ['customerType', 'applyBasicInfo'],
    data() {
      return {
        tabIndex: 0,
        loadingContactBook: false,
        contactBookTotal: 0,
        callOutTotal: 0,
        callInTotal: 0,
        searchForm: {
          phoneNo: '',
          currentPage: 1
        }
      };
    },
    mounted() {
      this.getEmergencyContact();
      this.getContactBooks();
      this.getCallInList();
      this.getCallOutList();
    }
  };
</script>
<style lang="scss" scoped="">

</style>
