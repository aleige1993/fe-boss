<template>
  <div id="page-product">
    <Breadcrumb separator=">">
      <BreadcrumbItem href="/">首页</BreadcrumbItem>
      <BreadcrumbItem>产品管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <Form inline label-position="left">
        <FormItem prop="user" label="产品名称" :label-width="100">
          <Input type="text" placeholder="客户名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">
            <Icon type="ios-search-strong"></Icon>
            搜索
          </Button>
        </FormItem>
      </Form>
    </div>
    <div class="form-top-actions">
      <Button type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</Button>
      <Button type="success"><i class="iconfont icon-daochu"></i> 套餐维护</Button>
      <Button type="warning"><i class="iconfont icon-daochu"></i> 基础材料维护</Button>
      <Button type="ghost"><i class="iconfont icon-daochu"></i> 准入规则维护</Button>
    </div>
    <Table border ref="selection" :columns="columns7" :data="data1"></Table>
    <div class="page-container">
      <Page :current="1" :total="40" size="small" show-elevator show-total></Page>
    </div>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';

  export default {
    name: '',
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        showAddModal: false,
        columns7: [
          {
            title: '产品编号',
            width: 100,
            align: 'center',
            key: 'productNumber'
          },
          {
            title: '产品名称',
            key: 'producName'
          },
          {
            title: '产品类型',
            key: 'productType'
          },
          {
            title: '产品状态',
            key: 'productState'
          },
          {
            title: '创建时间',
            key: 'creationTime'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: '创建人',
            key: 'Founder'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                      console.log(params);
                    }
                  }
                }, '详情'),
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
                      //this.show(params.index);
                    }
                  }
                }, '修改'),
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
        data1: []
      };
    },
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/product', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      remove(index) {
        this.data1.splice(index, 1);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-product {

  }
</style>
