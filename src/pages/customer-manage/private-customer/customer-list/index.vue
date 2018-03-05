<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item>个人客户管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <table-customer-list type="page" @on-row-dbclick="selectSpouseRow">
      <div class="form-top-actions" slot="topAction">
        <i-button type="info" @click="goToAdd"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        <!--<i-button type="error"><i class="iconfont icon-shanchu"></i> 加入黑名单</i-button>-->
      </div>
    </table-customer-list>
    <pt-modal title="添加客户" v-model="showAddModal" :width="600" :zIndex="200">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="用户密码" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px">重置</i-button>
        </i-form-item>
      </Form>
    </pt-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  import TableCustomerList from '@/components/table-customer-list';
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
          name: '',
          certType: '',
          certNo: '',
          mobile: '',
          currentPage: 1,
          pageSize: 15
        }
      };
    },
    methods: {
      goToAdd() {
        this.$router.push('/index/customer/privatecustomer/add');
      },
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/member/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.privateCustomerList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      search() {
        this.getPrivateCustomerList(1);
      },
      selectSpouseRow(row, index) {
        // todo
      }
    },
    components: {
      'pt-modal': PTModal,
      TableCustomerList
    },
    mounted() {
      this.getPrivateCustomerList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
