<template>
  <div id="page-product">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item>产品管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left">
        <i-form-item prop="user" label="产品名称" :label-width="100">
          <i-input type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
      <i-button type="success"><i class="iconfont icon-daochu"></i> 套餐维护</i-button>
      <i-button type="warning"><i class="iconfont icon-daochu"></i> 基础材料维护</i-button>
      <i-button type="ghost"><i class="iconfont icon-daochu"></i> 准入规则维护</i-button>
    </div>
    <i-table border ref="selection" :columns="columns7" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
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
