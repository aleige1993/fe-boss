<template>
<!--合同模板列表模态框-->
  <div id="table-contractTemplate-list">
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="contractTemplateName" label="合同名称" :label-width="100">
          <i-input type="text" placeholder="合同名称"  v-model="formSearch.contractTemplateName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="search">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table @on-row-dblclick="selectRow" border  :page-size="pageSize" :loading="dataLoading" ref="contractTemplateTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
  </div>
</template>

<script>
  import DataMixin from './mixin-data';
  export default {
    name: '',
    mixins: [DataMixin],
    data() {
      return {
        dataLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 8,
        formSearch: {
          contractTemplateName: '',
          pageSize: 8,
          currentPage: 1
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.formSearch.currentPage = page;
        }
        let resp = await this.$http.post('/contract/listContractTemplate', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          contractTemplateName: this.$data.formSearch.contractTemplateName
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
      search() {
        this.getPrivateCustomerList(1);
      },
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
