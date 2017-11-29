<template>
  <div id="page-table-demo">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.userName" placeholder="员工姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.userCode" type="text" placeholder="员工编号"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.mobile" type="text" placeholder="手机号码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="employerColumns" :data="employerList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'privateCustomer',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          userName: '',
          userCode: '',
          mobile: ''
        }
      };
    },
    methods: {
      async getEmployerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/common/user/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.employerList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        }
      },
      jumpPage(page) {
        this.getEmployerList(page);
      },
      search() {
        this.getEmployerList();
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    },
    components: {
      'pt-modal': PTModal
    },
    mounted() {
      this.getEmployerList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
