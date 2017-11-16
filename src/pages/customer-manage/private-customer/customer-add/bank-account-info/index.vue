<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="false" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal :title="addContactModalTitle" v-model="addBankModal">
      <i-form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="账户名" prop="name">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="账号" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="银行名称" prop="mail">
          <i-select id="u5568_input" placeholder="">
            <i-option value="亲属">中国农业银行</i-option>
            <i-option value="朋友">中国招商银行</i-option>
            <i-option value="同事">中国建设银行</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="开户行" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="开户行号" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="预留手机号" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button type="primary" size="large" style="width: 80px;">提交</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  export default {
    name: '',
    data() {
      return {
        addBankModal: false,
        bankAccountColumns: [
          {
            title: '账户名',
            key: 'accountName'
          },
          {
            title: '账号',
            key: 'accountNo'
          },
          {
            title: '银行名称',
            key: 'bankName'
          },
          {
            title: '开户行号',
            key: 'bankNo'
          },
          {
            title: '开户行',
            key: 'bankBranchName'
          },
          {
            title: '操作',
            key: 'action',
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
                      this.show(params.index);
                    }
                  }
                }, '编辑'),
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
        bankAccountDatas: [
          {
            accountName: 'Joe Black',
            accountNo: '25645415842142151',
            bankName: '中国工商银行',
            type: '客户',
            bankNo: '2254',
            bankBranchName: '上清寺支行'
          }
        ]
      };
    },
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss">

</style>
