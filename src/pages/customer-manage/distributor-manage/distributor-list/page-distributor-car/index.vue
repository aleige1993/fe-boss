<template>
<!--渠道商列表-车型管理-->
  <div id="pageDistributorCar">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>车型管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border :loading="dataLoading" ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BModal from '@/components/bs-modal';
  export default {
    name: 'pageDistributorCar',
    components: {
      BModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        dataLoading: false,
        buttonLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 4,
        formCustom: {}
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/listVhc', {
          merchantNo: this.$route.query.merchantNo,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.showAddModal = true;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
