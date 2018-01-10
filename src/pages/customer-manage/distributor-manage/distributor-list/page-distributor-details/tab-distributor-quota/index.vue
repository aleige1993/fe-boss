<template>
<div id="">
  <div v-if="!isDetails">
    <div class="form-block-title">
      公司名称
    </div>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="user">
          <i-input v-model="formSearch.corpName" style="width: 240px;" type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary"><i-icon type="ios-search-strong" @cilck="search"></i-icon>
            <span v-if="!searchLoading"> 搜索</span>
            <span v-else> loading</span>
          </i-button>
        </i-form-item>
      </i-form>
    </div>
  </div>
  <i-table :loading="dataLoading" border ref="tableData" :columns="distributorColumns" :data="distributorList"></i-table>
  <div class="page-container">
    <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
  </div>
</div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tabDistributorQuota',
    mixins: [MixinData],
    data() {
      return {
        isDetails: false,
        total: 0,
        currentPage: 1,
        pageSize: 15,
        dataLoading: false,
        searchLoading: false,
        formSearch: {
          corpName: ''
        }
      };
    },
    props: ['detail'],
    mounted() {
      if (this.detail === 'detail') {
        this.$data.isDetails = true;
      };
      this.getList();
    },
    methods: {
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/credit/list', {
          merchantNo: this.$route.query.merchantNo,
          corpName: this.$data.formSearch.corpName, // 公司名称，模糊查询
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$data.distributorList = [];
        }
      },
      jumpPage(page) {
        this.getList(page);
      },
      async search() {
        this.$data.searchLoading = true;
        await this.getList(1);
        this.$data.searchLoading = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
