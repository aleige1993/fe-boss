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
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
      <i-button type="ghost"><i class="iconfont icon-shenhe"></i> 利率方案配置</i-button>
      <i-button type="ghost"><i class="iconfont icon-shenhe"></i> 费用收取配置</i-button>
      <i-button type="ghost"><i class="iconfont icon-shenhe"></i> 贷款材料配置</i-button>
      <i-button type="ghost"><i class="iconfont icon-shenhe"></i> 准入规则配置</i-button>
      <i-button type="ghost"><i class="iconfont icon-shenhe"></i> 归档材料配置</i-button>
    </div>
    <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal title="添加产品" v-model="showAddModal" :width="600">
      <i-form ref="formValidate" label-position="left" :label-width="100">
        <i-form-item class="required" label="产品类别" prop="protype">
          <i-input placeholder="请输入产品类别" v-model="addSubmit.protype"></i-input>
        </i-form-item>
        <i-form-item class="required" label="产品名称" prop="proname">
          <i-input placeholder="请输入产品名称" v-model="addSubmit.proname"></i-input>
        </i-form-item>
        <i-form-item label="状态" prop="state">
          <i-select v-model="addSubmit.formItem.select">
            <i-option value="0">启用</i-option>
            <i-option value="1">停用</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用流程" prop="state">
          <i-select v-model="addSubmit.formItem.select">
            <i-option value="1">流程一</i-option>
            <i-option value="2">流程二</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="产品说明" prop="proname">
          <i-input v-model="addSubmit.formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
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
        addSubmit: {
          protype: '',
          proname: '',
          formItem: {
            select: '',
            textarea: ''
          }
        },
        columns1: [
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
                /*h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // console.log(params);
                    }
                  }
                }, '详情'),*/
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
        data1: [],
        name: ''
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
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      formSubmit() {
        console.log(this.$refs.formValidate);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-product {
    & .form-top-actions {
      font-size: 0;
      & button {
        margin-right: 10px;
      }
    }
  }
</style>
