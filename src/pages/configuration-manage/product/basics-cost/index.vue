<template>
<!--费用类型配置-->
  <div id="page-cost">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品管理</i-breadcrumb-item>
      <i-breadcrumb-item>费用类型配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        columns1: [
          {
            title: '费用类型ID',
            align: 'center',
            key: 'costId'
          },
          {
            title: '费用类型名称',
            key: 'costName'
          },
          {
            title: '收支方向',
            key: 'costDirection'
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
                      // this.show(params.index);
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
        data1: [
          {
            costId: '001',
            costName: '456',
            costDirection: '收入'
          },
          {
            costId: '002',
            costName: '789',
            costDirection: '支出'
          }
        ]
      };
    },
    methods: {
      remove(index) {
        this.$data.data1.splice(index, 1);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-cost {
    & .bs-form-block .block-body {
      border: 0;
    }
    & .form-top-actions {
      font-size: 0;
      padding-left: 10px;
      & button {
        margin-right: 10px;
      }
    }
  }
</style>
