<template>
<!--选择资方的模态框-->
  <div id="getCapitalModal">
    <i-table :loading="dataLoading" border ref="proTable" :columns="columns1" :data="data1" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'getCapitalModal',
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false,
        pageSize: 10,
        total: 0,
        currentPage: 1
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 获取资方维护列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/capital/accBaseInfoList', {
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
      // 分页跳转
      jumpPage(page) {
        this.getPrivateCustomerList(page);
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
