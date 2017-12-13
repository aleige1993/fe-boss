<template>
<!--渠道商详情-车型管理详情-->
  <div id="distributorDedailsCar">
    <i-table :loading="dataLoading" border ref="distributorCarTable" :columns="columnsCar" :data="dataCar"></i-table>
    <div class="page-container">
      <i-page :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="junmpPage">
      </i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'distributorDedailsCar',
    mixins: [MixinData],
    data() {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 4,
        dataLoading: false
      };
    },
    props: ['merchantNo'],
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      junmpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/listVhc', {
          merchantNo: this.merchantNo,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        console.log(resp);
        if (resp.body.resultList.length !== 0) {
          this.$data.dataCar = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '车型管理列表没有数据可加载',
            duration: 2
          });
          this.$data.dataCar = [];
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
