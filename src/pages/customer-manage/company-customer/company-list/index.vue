<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item>企业客户管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <table-company-customer-list type="page" @on-row-dbclick="selectCompanyCustomer">
      <div class="form-top-actions" slot="topAction">
        <i-button type="info" @click="goToAdd"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        <!--<i-button type="error"><i class="iconfont icon-shanchu"></i> 加入黑名单</i-button>-->
      </div>
    </table-company-customer-list>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: 'companyCustomer',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false
      };
    },
    methods: {
      goToAdd() {
        this.$router.push('/index/customer/companycustomer/modify');
      },
      selectCompanyCustomer(row, index) {
        this.$Modal.info({
          content: index
        });
      }
    },
    components: {
      'pt-modal': PTModal,
      TableCompanyCustomerList
    }
  };
</script>
<style lang="scss" scoped>
</style>
