<template>
  <div id="" class="clearfix">
    <Breadcrumb separator=">">
      <BreadcrumbItem href="/">首页</BreadcrumbItem>
      <BreadcrumbItem href="/components/breadcrumb">进件管理</BreadcrumbItem>
      <BreadcrumbItem>进件申请</BreadcrumbItem>
    </Breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <Form inline>
        <FormItem prop="user">
            <Input type="text" placeholder="客户名称"></Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" placeholder="客户名称"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary"><Icon type="ios-search-strong"></Icon> 搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="form-top-actions">
      <Button type="info" @click="addModal"><i class="iconfont icon-xinzeng"></i> 新增</Button>
      <Button type="error"><i class="iconfont icon-shanchu"></i> 批量删除</Button>
      <Button type="success"><i class="iconfont icon-daochu"></i> 导出</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    <div class="page-container">
      <Page :total="40" size="small" show-elevator show-sizer show-total></Page>
    </div>
    <pt-modal title="添加产品" v-model="showAddModal" :width="600">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <Input placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="用户密码" prop="mail">
            <Input placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
            <Input placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <Input placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <Input placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem class="text-right">
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </pt-modal>
  </div>
</template>
<script>
import LeftNav from '@/pages/common/left-nav';
import PTModal from '@/components/bs-modal';
export default {
  name: '',
  data() {
    return {
      showAddModal: false,
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    };
  },
  methods: {
    addModal() {
      this.$data.showAddModal = true;
    }
  },
  components: {
    LeftNav,
    'pt-modal': PTModal
  }
};
</script>
<style lang="scss" scoped>
</style>
