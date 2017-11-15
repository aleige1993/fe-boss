<template>
<!--贷款材料配置-->
  <div id="page-loan">
    <bs-form-block :title="'贷款材料配置'">
      <div class="form-top-actions">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增产品</i-button>
      </div>
      <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
      <div class="page-container">
        <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
      </div>
    </bs-form-block>
    <pt-modal title="添加产品" v-model="showAddModal" :width="600">
      <i-form ref="formValidate" label-position="left" :label-width="100">
        <i-form-item class="required" label="产品说明" prop="proname">
          <i-input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px">重置</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
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
        formItem: '',
        columns1: [
          {
            title: '贷款材料ID',
            align: 'center',
            key: 'loanId'
          },
          {
            title: '贷款材料名称',
            key: 'loanName'
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
            loanId: '001',
            loanName: '456'
          },
          {
            loanId: '002',
            loanName: '789'
          }
        ]
      };
    },
    methods: {
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.$data.data1.splice(index, 1);
      },
      formSubmit() {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-loan {
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
