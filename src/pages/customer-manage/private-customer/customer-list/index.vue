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
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" placeholder="客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-select placeholder="证件类型">
            <i-option>身份证</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="password">
          <i-input type="password" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input type="password" placeholder="手机号码"></i-input>
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
            title: '客户编号',
            key: 'name'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'name'
          },
          {
            title: '证件类型',
            key: 'name'
          },
          {
            title: '证件号码',
            key: 'name'
          },
          {
            title: '状态',
            key: 'age'
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '冻结')
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
      goToAdd() {
        this.$router.push('/index/customer/modify');
      }
    },
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss" scoped>
</style>
