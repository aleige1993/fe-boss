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
    <i-table :height="tableFixHeight" :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="employerColumns" :data="employerList"></i-table>
    <!--<div class="page-container">-->
      <!--<i-page :total="searchForm.total" :page-size="searchForm.pageSize" :current="searchForm.currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>-->
    <!--</div>-->
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
        certTypeEnum: [],
        searchForm: {
          userName: '',
          userCode: '',
          mobile: '',
          deptId: '',
          total: 0,
          currentPage: 1,
          pageSize: 99999999
        }
      };
    },
    props: {
      deptId: {
        type: String,
        required: false,
        default: ''
      }
    },
    methods: {
      async getEmployerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        this.$data.searchForm.deptId = this.deptId;
        let resp = await this.$http.post('/common/user/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.employerList = resp.body.resultList;
          this.$data.searchForm.currentPage = resp.body.currentPage / 1;
          this.$data.searchForm.total = resp.body.totalNum / 1;
        }
      },
      jumpPage(page) {
        this.getEmployerList(page);
      },
      search() {
        this.getEmployerList(1);
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
