<template>
  <div id="" class="clearfix">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/i-breadcrumb">贷前管理</i-breadcrumb-item>
      <i-breadcrumb-item>进件登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      <i-button type="error"><i class="iconfont icon-shanchu"></i> 批量删除</i-button>
      <i-button type="success"><i class="iconfont icon-daochu"></i> 导出</i-button>
    </div>
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :label-width="120">
          <bs-form-block :title="'客户信息'">
            <i-row v-for="item in ary1">
              <i-col span="6">
                <i-form-item label="姓名" prop="name">
                    <i-input placeholder="请输入姓名" v-model="username"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="用户联系电话" prop="name">
                    <i-input placeholder="请输入姓名" v-model="username"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'申请信息'">
            <i-row v-for="item in ary1">
              <i-col span="6">
                <i-form-item label="姓名" prop="name">
                    <i-input placeholder="请输入姓名" v-model="username"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="6">
                <i-form-item label="用户联系电话" prop="name">
                    <i-input placeholder="请输入姓名" v-model="username"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <div class="form-footer-actions">
            <i-button type="primary"><i class="iconfont icon-tijiao"></i> 提交</i-button>
            <i-button type="success"><i class="iconfont icon-jujue"></i> 重置</i-button>
            <i-button><i class="iconfont icon-dayin"></i> 打印</i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
  </div>
</template>
<script>
import LeftNav from '@/pages/common/left-nav';
export default {
  name: '',
  data() {
    return {
      username: '',
      ary1: new Array(8).fill(7)
    };
  },
  components: {
    LeftNav
  }
};
</script>
<style lang="scss" scoped>
</style>
