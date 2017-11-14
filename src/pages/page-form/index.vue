<template>
  <div id="" class="clearfix">
    <Breadcrumb separator=">">
      <BreadcrumbItem href="/">首页</BreadcrumbItem>
      <BreadcrumbItem href="/components/breadcrumb">进件管理</BreadcrumbItem>
      <BreadcrumbItem>进件申请</BreadcrumbItem>
    </Breadcrumb>
    <div class="form-top-actions">
      <Button type="info"><i class="iconfont icon-xinzeng"></i> 新增</Button>
      <Button type="error"><i class="iconfont icon-shanchu"></i> 批量删除</Button>
      <Button type="success"><i class="iconfont icon-daochu"></i> 导出</Button>
    </div>
    <Row>
      <Col span="24">
        <Form label-position="right" :label-width="120">
          <bs-form-block :title="'客户信息'">
            <Row v-for="item in ary1">
              <Col span="6">
                <FormItem label="姓名" prop="name">
                    <Input placeholder="请输入姓名" v-model="username"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="用户联系电话" prop="name">
                    <Input placeholder="请输入姓名" v-model="username"></Input>
                </FormItem>
              </Col>
            </Row>
          </bs-form-block>
          <bs-form-block :title="'申请信息'">
            <Row v-for="item in ary1">
              <Col span="6">
                <FormItem label="姓名" prop="name">
                    <Input placeholder="请输入姓名" v-model="username"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="用户联系电话" prop="name">
                    <Input placeholder="请输入姓名" v-model="username"></Input>
                </FormItem>
              </Col>
            </Row>
          </bs-form-block>
          <div class="form-footer-actions">
            <Button type="primary"><i class="iconfont icon-tijiao"></i> 提交</Button>
            <Button type="success"><i class="iconfont icon-jujue"></i> 重置</Button>
            <Button><i class="iconfont icon-dayin"></i> 打印</Button>
          </div>
        </Form>
      </Col>
    </Row>
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
