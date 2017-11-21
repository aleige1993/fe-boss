<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item>黑名单管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" placeholder="姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input type="password" placeholder="身份证号码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="addModal=!addModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <Table :loading="dataLoading" border ref="selection" :columns="columns4" :data="blacklistData"></Table>
    <div class="page-container">
      <Page :total="40" size="small" show-elevator show-sizer show-total></Page>
    </div>
    <pt-modal title="添加黑名单" v-model="addModal" :width="600" :zIndex="200">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="身份证号" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="原因" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="来源" prop="name">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开始时间" prop="mail">
          <i-date-picker style="width: 100%" placeholder="选择时间"></i-date-picker>
        </i-form-item>
        <i-form-item label="结束时间" prop="mail">
          <i-date-picker style="width: 100%" placeholder="选择时间"></i-date-picker>
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
    name: 'blacklist',
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false,
        addModal: false
      };
    },
    methods: {
      async getBlacklist() {
        // get data
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/blacklist/list', {});
        this.$data.dataLoading = false;
        let data = resp.body;
        this.$data.blacklistData = data;
      }
    },
    components: {
      'pt-modal': PTModal
    },
    mounted() {
      this.getBlacklist();
    }
  };
</script>
<style lang="scss" scoped>
</style>
