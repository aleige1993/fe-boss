<template>
  <div id="">
    <div class="search-form-container">
      <i-form inline ref="companySearchForm" :model="searchForm">
        <i-form-item prop="corpName">
          <i-input v-model="searchForm.corpName" type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item prop="creditCode">
          <i-input v-model="searchForm.creditCode" type="text" placeholder="统一社会信用代码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+48" border :loading="dataLoading" ref="selection" @on-row-dblclick="selectRow" :columns="resultCompanyCustomerColumns" :data="companyCustomerData"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
import MixinData from './mixin-data';
export default {
  name: 'tableCompanyCustomerList',
  mixins: [MixinData],
  data() {
    return {
      dataLoading: false,
      total: 0,
      currentPage: 1,
      pageSize: 15,
      searchForm: {
        corpName: '',
        creditCode: ''
      }
    };
  },
  computed: {
    resultCompanyCustomerColumns() {
      if (this.type === 'modal') {
        return this.$data.companyCustomerColumns;
      } else {
        return [...this.$data.companyCustomerColumns, ...this.$data.companyCustomerActionColumns];
      }
    }
  },
  props: {
    type: String,
    default: 'page',
    required: false
  },
  methods: {
    async getCompanyCustomerList(page) {
      this.$data.dataLoading = true;
      if (page) {
        this.$data.currentPage = page;
      }
      if (this.type === 'modal') {
        this.$data.searchForm.status = '1';
      }
      let resp = await this.$http.post('/corp/listCorp', {
        ...this.$data.searchForm,
        currentPage: this.$data.currentPage,
        pageSize: this.$data.pageSize
      });
      this.$data.dataLoading = false;
      this.$data.companyCustomerData = resp.body.resultList;
      this.$data.currentPage = resp.body.currentPage / 1;
      this.$data.total = resp.body.totalNum / 1;
    },
    jumpPage(page) {
      this.getCompanyCustomerList(page);
    },
    search() {
      this.getCompanyCustomerList(1);
    },
    selectRow(row, index) {
      this.$emit('on-row-dbclick', row, index);
    }
  },
  mounted() {
    this.$refs['companySearchForm'].resetFields();
    this.getCompanyCustomerList();
  }
};
</script>
<style lang="scss" scoped>
</style>
