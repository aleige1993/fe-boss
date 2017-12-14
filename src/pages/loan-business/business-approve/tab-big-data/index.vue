<template>
  <div id="">
    <i-tabs v-model="tabIndex" :animated="false">
      <i-tab-pane label="业务往来"></i-tab-pane>
      <i-tab-pane label="作为第三方保证"></i-tab-pane>
      <i-tab-pane label="电话本联系人">
        <div  v-if="tabIndex==2">
          <div class="search-form-container">
            <i-form inline>
              <i-form-item prop="user">
                <i-input type="text" v-model="contactBookSearchForm.contactsPhone" style="width: 240px" placeholder="联系人电话"></i-input>
              </i-form-item>
              <i-form-item>
                <i-button type="primary" @click="searchContactBooks"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
              </i-form-item>
            </i-form>
          </div>

          <i-table :loading="loadingContactBook" :columns="contactBookColumns" :data="contactBookDatas"></i-table>
          <div class="page-container">
            <i-page @on-change="contactBooksPageChange" :total="contactBookTotal" :page-size="15" size="small"  show-total></i-page>
          </div>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼入记录">
        <div  v-if="tabIndex==3">
          <div class="search-form-container">
            <i-form inline>
              <i-form-item prop="user">
                <i-input v-model="callInListSearchForm.contactsPhone" type="text" style="width: 240px" placeholder="联系人电话"></i-input>
              </i-form-item>
              <i-form-item>
                <i-button @click="callInSearch" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
              </i-form-item>
            </i-form>
          </div>
          <i-table :loading="loadingContactBook" :columns="callInColumns" :total="callInTotal" :data="callInDatas"></i-table>
          <div class="page-container">
            <Page @on-change="callInPageChange" :total="callInTotal" size="small"  show-total></Page>
          </div>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼出记录">
        <div  v-if="tabIndex==4">
          <div class="search-form-container">
            <i-form inline>
              <i-form-item prop="user">
                <i-input v-model="callOutListSearchForm.contactsPhone" type="text" style="width: 240px" placeholder="联系人电话"></i-input>
              </i-form-item>
              <i-form-item>
                <i-button @click="callOutSearch" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
              </i-form-item>
            </i-form>
          </div>
          <i-table :loading="loadingContactBook" :columns="callInColumns" :total="callOutTotal" :data="callInDatas"></i-table>
          <div class="page-container">
            <Page @on-change="callOutPageChange" :total="callOutTotal" size="small"  show-total></Page>
          </div>
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
    data() {
      return {
        tabIndex: 0,
        contactBookSearchForm: {
          contactsPhone: '',
          currentPage: 1
        },
        callInListSearchForm: {
          contactsPhone: '',
          currentPage: 1
        },
        callOutListSearchForm: {
          contactsPhone: '',
          currentPage: 1
        }
      };
    }
  };
</script>
<style lang="scss" scoped="">

</style>