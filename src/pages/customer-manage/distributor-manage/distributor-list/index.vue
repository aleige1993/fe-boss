<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">进件管理</i-breadcrumb-item>
      <i-breadcrumb-item>进件申请</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input style="width: 240px;" type="text" placeholder="公司名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="openAddDistributorModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="distributorListLoading" border ref="selection" :columns="distributorColumns" :data="distributorList"></i-table>
    <div class="page-container">
      <i-page :total="40" size="small" show-elevator show-sizer show-total></i-page>
    </div>
    <bs-modal title="添加产品" v-model="addDistributorModal" :width="600">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px">重置</i-button>
        </i-form-item>
      </Form>
    </bs-modal>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
        addDistributorModal: false,
        distributorListLoading: false
      };
    },
    components: {
      BsModal
    },
    methods: {
      openAddDistributorModal() {
        this.$data.addDistributorModal = true;
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>