<template>
<div id="page-product-details">
  <Breadcrumb separator=">">
    <BreadcrumbItem href="/">首页</BreadcrumbItem>
    <BreadcrumbItem href="/pages/configuration-manage/page-product">产品管理</BreadcrumbItem>
    <BreadcrumbItem">产品查询</BreadcrumbItem>
  </Breadcrumb>
  <div class="form-block-title">
    基本信息
  </div>
  <Form :model="formItem" :label-width="80">
    <Row :gutter="16">
      <Col span="8">123
      </Col>
      <Col span="8">456
      </Col>
      <Col span="8">789
      </Col>
    </Row>
  </Form>
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
