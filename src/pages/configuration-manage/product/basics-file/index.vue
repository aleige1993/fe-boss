<template>
<!--归档材料配置-->
  <div id="page-file">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品管理</i-breadcrumb-item>
      <i-breadcrumb-item>归档材料配置</i-breadcrumb-item>
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
        <i-form-item label="归档材料名称" prop="proname">
          <i-input v-model="formCustom.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入归档材料名称..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" @click="handleCancel()" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'basics-file',
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        listIndex: Number,
        formCustom: {
          textarea: ''
        },
        columns1: [
          {
            title: '归档材料ID',
            align: 'center',
            key: 'fileId'
          },
          {
            title: '归档材料名称',
            key: 'fileName'
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
        data1: [
          {
            fileId: '001',
            fileName: '456'
          },
          {
            fileId: '002',
            fileName: '789'
          }
        ]
      };
    },
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/productFile', {});
      try {
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
        this.formCustom.textarea = row.fileName;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            fileId: '003',
            fileName: this.$data.formCustom.textarea
          });
          this.$data.showAddModal = false;
        } else {
          let textData = this.$data.formCustom.textarea;
          this.$data.data1[this.listIndex].fileName = textData;
          this.$data.showAddModal = false;
        }
        this.$data.formCustom.textarea = '';
      },
      handleCancel() {
        this.$data.showAddModal = false;
        this.$data.formCustom.textarea = '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-file {
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
