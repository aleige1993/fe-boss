<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商授信审核</i-breadcrumb-item>
    </i-breadcrumb>
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
    <i-table :height="tableFixHeight+48" :loading="dataLoading" border ref="tableData" :columns="distributorColumns" :data="distributorList"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
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
    mounted() {
      // 从新增页面跳转回来，加载之前的指定页码
      if (this.$route.query.currentPage) {
        this.$data.currentPage = this.$route.query.currentPage / 1;
      }
      this.getList();
    },
    components: {
      BsModal
    },
    methods: {
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/credit/auditList', {
          corpName: this.$data.formSearch.corpName, // 公司名称，模糊查询
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
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
<style lang="scss" scoped="">
</style>
