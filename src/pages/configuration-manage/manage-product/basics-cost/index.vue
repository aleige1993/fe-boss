<template>
<!--费用类型配置-->
  <div id="page-cost">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>费用类型配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal title="新增" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="费用类型名称" prop="protype">
          <i-input placeholder="请输入费用类型名称" v-model="formCustom.costName"></i-input>
        </i-form-item>
        <i-form-item label="收支方向" prop="state">
          <i-select v-model="formCustom.costDirection">
            <i-option value="收入">收入</i-option>
            <i-option value="支出">支出</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'basics-cost',
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        isAdd: true,
        listIndex: Number,
        showAddModal: false,
        formCustom: {
          costName: '',
          textarea: ''
        },
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
                      this.listIndex = params.index;
                      this.setList(params.row);
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
      let response = await this.$http.post('/pms/cfgFeeType/list', {});
      try {
        console.log(response);
        Vm.$data.data1 = response.list;
      } catch (err) {}
    },
    methods: {
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.$data.data1.splice(index, 1);
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.costName = row.costName;
        this.formCustom.costDirection = row.costDirection;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            loanId: '003',
            costName: this.$data.formCustom.costName,
            costDirection: this.$data.formCustom.costDirection
          });
          this.$data.showAddModal = false;
        } else {
          this.$data.data1[this.listIndex].costName = this.$data.formCustom.costName;
          this.$data.data1[this.listIndex].costDirection = this.$data.formCustom.costDirection;
          this.$data.showAddModal = false;
        }
        this.formReset();
      },
      handleCancel() {
        this.$data.showAddModal = false;
      },
      formReset() {
        this.formCustom.costName = '';
        this.formCustom.costDirection = '';
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
