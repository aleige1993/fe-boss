<template>
  <div id="">
    <i-breadcrumb separator=">" v-if="!isDetail">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商授信审核</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      公司名称
    </div>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input style="width: 240px;" type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table :loading="dataListLoading" border ref="tableData" :columns="distributorColumns" :data="distributorList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
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
        clickRow: {},
        total: 0,
        currentPage: 1,
        pageSize: 15,
        dataListLoading: false
      };
    },
    props: ['isDetail'],
    mounted() {
      // 从新增页面跳转回来，加载之前的指定页码
      this.$data.currentPage = this.$route.query.currentPage;
    },
    components: {
      BsModal
    },
    methods: {
      openAddDistributorModal() {
        this.$router.push({
          path: '/index/customer/distributor/add',
          query: {
            currentPage: this.$data.currentPage
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
