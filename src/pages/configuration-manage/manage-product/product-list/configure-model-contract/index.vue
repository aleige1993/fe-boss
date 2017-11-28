<template>
<!--合同模板配置-->
  <div id="configure-model-contract">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border ref="zfTable" :columns="columns1" :data="data1"></i-table>
    <br>
    <br>
    <bs-model :title="'新增'" v-model="showAddModal">
      <i-form ref="formCustom" :model="formCustom" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item label="产品名称" prop="proname">
          <p>{{formCustom.proname}}</p>
        </i-form-item>
        <i-form-item label="合同模板" prop="Template">
          <i-select v-model="formCustom.Template">
            <i-option value="1">合同模板一</i-option>
            <i-option value="2">合同模板二</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="签订方式" prop="Sign">
          <i-select v-model="formCustom.Sign">
            <i-option value="1">线上</i-option>
            <i-option value="2">线下</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用类型" prop="type">
          <i-select v-model="formCustom.type">
            <i-option value="1">云易行</i-option>
            <i-option value="2">海乐行</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-model>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'configure-model-contract',
    components: {
      'bs-model': BSModal
    },
    data() {
      return {
        showAddModal: false,
        formCustom: {
          proname: '',
          Sign: '',
          Template: '',
          type: ''
        },
        columns1: [
          {
            title: '模板ID',
            width: 200,
            key: 'id'
          },
          {
            title: '合同名称',
            key: 'names'
          },
          {
            title: '适用类型',
            key: 'type'
          },
          {
            title: '签订方式',
            key: 'types'
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
                      this.setList(params.row);
                    }
                  }
                }, '修改'),*/
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
            id: '001',
            names: '海尔云贷',
            type: '类型3',
            types: '线上'
          },
          {
            id: '002',
            names: '海尔云贷01',
            type: '类型1',
            types: '线上'
          },
          {
            id: '003',
            names: '海尔云贷02',
            type: '类型2',
            types: '线下'
          }

        ]
      };
    },
    methods: {
      addModal() {
        this.$data.showAddModal = true;
      },
      remove() {},
      formSubmit() {},
      formCancel() {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
