<template>
<!--准入规则配置-->
  <div id="page-rule">
    <bs-form-block :title="'准入规则配置'">
      <div class="form-top-actions">
        <i-button type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
      <div class="page-container">
        <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
      </div>
    </bs-form-block>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        columns1: [
          {
            title: '准入规则ID',
            align: 'center',
            key: 'ruleId'
          },
          {
            title: '准入规则名称',
            key: 'ruleName'
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
            ruleId: '001',
            ruleName: '456'
          },
          {
            ruleId: '002',
            ruleName: '789'
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
  #page-rule {
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
