<template>
  <div id="">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input v-model="searchForm.searchForm" type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.creditCode" type="password" placeholder="统一社会信用编码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table border :loading="dataLoading" ref="selection" @on-row-dblclick="selectRow" :columns="companyCustomerColumns" :data="companyCustomerData"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="40" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tableCompanyCustomerList',
  data() {
    return {
      dataLoading: false,
      searchForm: {
        corpName: '',
        creditCode: '',
        currentPage: 1,
        pageSize: 15
      },
      companyCustomerColumns: [
        {
          title: '客户编号',
          key: 'corpNo'
        },
        {
          title: '公司名称',
          key: 'corpName'
        },
        {
          title: '统一社会信用代码',
          key: 'creditCode',
          width: 150
        },
        {
          title: '法定代表人',
          key: 'legalPerson'
        },
        {
          title: '注册时间',
          key: 'regDate'
        },
        {
          title: '注册资金',
          key: 'regCapital'
        },
        {
          title: '公司电话',
          key: 'telephone'
        },
        {
          title: '状态',
          key: 'age'
        }
      ],
      companyCustomerData: []
    };
  },
  methods: {
    async getCompanyCustomerList(page) {
      this.$data.dataLoading = true;
      if (page) {
        this.$data.searchForm.currentPage = page;
      }
      let resp = await this.$http.post('/corp/listCorp', this.$data.searchForm);
      this.$data.dataLoading = false;
      this.$data.companyCustomerData = resp.body.resultList;
      this.$data.currentPage = resp.body.currentPage;
      this.$data.total = resp.body.totalNum;
    },
    jumpPage(page) {
      this.getCompanyCustomerList(page);
    },
    search() {
      this.getCompanyCustomerList();
    },
    selectRow(row, index) {
      this.$emit('on-row-dbclick', row, index);
    }
  },
  mounted() {
    this.getCompanyCustomerList();
  }
};
</script>
<style lang="scss" scoped>
</style>
