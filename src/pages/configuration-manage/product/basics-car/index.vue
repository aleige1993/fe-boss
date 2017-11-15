<template>
<!--车辆材料配置-->
  <div id="page-car">
    <bs-form-block :title="'车辆材料配置'">
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
            title: '车辆材料ID',
            align: 'center',
            key: 'carId'
          },
          {
            title: '车辆材料名称',
            key: 'carName'
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
            carId: '001',
            carName: '456'
          },
          {
            carId: '002',
            carName: '789'
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
  #page-car {
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
