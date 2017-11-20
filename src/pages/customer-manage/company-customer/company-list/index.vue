<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item>企业客户管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input type="password" placeholder="统一社会信用编码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="goToAdd"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      <i-button type="error"><i class="iconfont icon-shanchu"></i> 加入黑名单</i-button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    <div class="page-container">
      <Page :total="40" size="small" show-elevator show-sizer show-total></Page>
    </div>
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
      }
    },
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss" scoped>
</style>
