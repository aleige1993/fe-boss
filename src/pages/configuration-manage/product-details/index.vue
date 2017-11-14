<template>
<div id="page-product-details">
  <i-breadcrumb separator="&gt;">
    <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
    <i-breadcrumb-item href="/pages/configuration-manage/page-product">产品管理</i-breadcrumb-item>
    <i-breadcrumb-item>产品查询</i-breadcrumb-item>
  </i-breadcrumb>
  <div class="form-block-title">
    基本信息
  </div>
  <i-form :model="formItem" :label-width="80">
    <i-row :gutter="16">
      <i-col span="8">123
      </i-col>
      <i-col span="8">456
      </i-col>
      <i-col span="8">789
      </i-col>
    </i-row>
  </i-form>
</div>
</template>

<script>
  export default {
    name: '',
    data: () => ({})
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
