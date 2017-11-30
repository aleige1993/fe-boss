<template>
<div id="maintain-user-modal">
  <div class="form-top-actions">
    <i-button @click="openShowModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
  </div>
  <i-table border ref="userTable" :columns="columns1" :data="data1" :loading="dataloading"></i-table>
  <br>
  <br>
  <!--//////////////////////////////////////////////////////////////////////////////////////////////-->
  <bs-modal :title="isAdd ? '新增' : '修改'" v-model="ShowModal" :width="1200">
    <i-form ref="formUser" :model="formUser" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--账户名-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}"
            label="账户名"
            prop="userName">
            <i-input v-model="formUser.userName"></i-input>
          </i-form-item>
        </i-col>
        <!--账号-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '账号不能为空', trigger: 'blur', type: 'number'}"
            label="账号"
            prop="userId">
            <i-input v-model="formUser.userId"></i-input>
          </i-form-item>
        </i-col>
        <!--银行名称-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '银行名称不能为空', trigger: 'change'}"
            label="银行名称"
            prop="bankName">
            <i-select placeholder="请选择" v-model="formUser.bankName">
              <i-option value="1">中国建设银行</i-option>
              <i-option value="2">中国工商银行</i-option>
              <i-option value="3">中国交通银行</i-option>
              <!--<i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
            </i-select>
          </i-form-item>
        </i-col>
        <!--开户行-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '开户行不能为空', trigger: 'blur'}"
            label="开户行"
            prop="bankOpen">
            <i-input v-model="formUser.bankOpen"></i-input>
          </i-form-item>
        </i-col>
        <!--开户行号-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '开户行号不能为空', trigger: 'blur', type: 'number'}"
            label="开户行号"
            prop="bankId">
            <i-input v-model="formUser.bankId"></i-input>
          </i-form-item>
        </i-col>
        <!--预留手机号-->
        <i-col span="12">
          <i-form-item
            label="预留手机号"
            prop="phone">
            <i-input v-model="formUser.phone"></i-input>
          </i-form-item>
        </i-col>
        <!--备注-->
        <i-col span="24">
          <i-form-item
            label="备注"
            prop="remarks">
            <i-input type="textarea" v-model="formUser.remarks"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
          <span v-if="!buttonLoading">提交</span>
          <span v-else>Loading...</span>
        </i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
      </i-form-item>
    </i-form>
  </bs-modal>
</div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'maintainUserModal',
    components: {
      'bs-modal': BSModal
    },
    data() {
      return {
        isAdd: true,
        ShowModal: false,
        buttonLoading: false,
        dataloading: false,
        formUser: {
          userName: '', // 账户名
          userId: '', // 账号
          bankName: '', // 银行名称
          bankOpen: '', //开户行
          bankId: '', // 开户行号
          phone: '', //预留手机号
          remarks: '' //备注
        },
        columns1: [
          {
            title: '账户名',
            align: 'center',
            key: 'userName'
          },
          {
            title: '账号',
            key: 'userId'
          },
          {
            title: '银行名称',
            key: 'bankName'
          },
          {
            title: '开户行号',
            key: 'bankId'
          },
          {
            title: '开户行',
            key: 'bankOpen'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      this.setList($.extend({}, params.row));
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove($.extend({}, params.row));
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [
          {
            userName: 'zhanghao01',
            userId: '123456789',
            bankName: '中国建设银行',
            bankId: '6220 5308 0000 8888 123',
            bankOpen: '石桥铺支行'
          }
        ]
      };
    },
    methods: {
      // 打开新增模态框
      openShowModal() {
        this.$data.isAdd = true;
        this.$data.ShowModal = true;
      },
      // 点击修改按钮
      setList(row) {
        this.$data.isAdd = false;
        this.$data.ShowModal = true;
      },
      // 删除按钮
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let productNo = row.productNo;
            /*const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/product/remove', {
              productNo: productNo
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除产品成功');
              this.getPrivateCustomerList(1);
            }*/
          }
        });
      },
      // 提交按钮
      formSubmit() {
        let formName = 'formUser';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.buttonLoading = true;
            // 如果是新增
            if (this.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 取消按钮
      formCancel() {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
