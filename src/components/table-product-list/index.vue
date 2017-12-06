<template>
  <!--通过下拉选择的获取产品列表组件-->
  <div id="getProductList">
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="productName" label="产品名称" :label-width="100">
          <i-input type="text" placeholder="产品名称" v-model="formSearch.productName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table border :loading="dataLoading" ref="selection" :columns="columns1" :data="data1" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>

</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'getProductList',
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false,
        total: 0,
        currentPage: 1,
        pageSize: 8,
        formSearch: {
          productName: '',
          currentPage: 1,
          pageSize: 8
        }
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
          this.$data.formSearch.currentPage = page;
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/product/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          productName: this.$data.formSearch.productName
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
      search() {
        this.getPrivateCustomerList();
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
