<template>
<div id="maintain-user-modal">
  <div class="form-top-actions">
    <i-button @click="openShowModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
  </div>
  <i-table border ref="userTable" :columns="columns1" :data="data1" :loading="dataLoading"></i-table>
  <br>
  <br>
  <!--//////////////////////////////////////////////////////////////////////////////////////////////-->
  <bs-modal :title="isAdd ? '新增' : '修改'" v-model="ShowModal" :width="1200">
    <i-form v-if="ShowModal" ref="formUser" :model="formUser" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--账户名-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '账户名不能为空', trigger: 'blur'}"
            label="账户名"
            prop="acctname">
            <i-input v-model="formUser.acctname"></i-input>
          </i-form-item>
        </i-col>
        <!--账号-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '账号不能为空', trigger: 'blur'}"
            label="账号"
            prop="acctno">
            <i-input v-model="formUser.acctno"></i-input>
          </i-form-item>
        </i-col>
        <!--银行名称-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '银行名称不能为空', trigger: 'change'}"
            label="银行名称"
            prop="bankcode">
            <i-select label-in-value placeholder="请选择" v-model="formUser.bankcode" @on-change="selectChaengeFun">
              <Option
                v-for="item in bankSelect"
                :value="item.bankCode"
                :selected="item.bankCode === formUser.bankcode"
                :key="item.value">
                {{ item.bankName }}
              </Option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--开户行-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '开户行不能为空', trigger: 'blur'}"
            label="开户行"
            prop="openbankname">
            <i-input v-model="formUser.openbankname"></i-input>
          </i-form-item>
        </i-col>
        <!--开户行号-->
        <i-col span="12">
          <i-form-item
            :rules="{required: true, message: '开户行号不能为空', trigger: 'blur'}"
            label="开户行号"
            prop="openbankno">
            <i-input v-model="formUser.openbankno"></i-input>
          </i-form-item>
        </i-col>
        <!--清算行号-->
        <i-col span="12">
          <i-form-item
            label="清算行号"
            prop="openbankclearingno">
            <i-input v-model="formUser.openbankclearingno"></i-input>
          </i-form-item>
        </i-col>
        <!--是否主账号-->
        <i-col span="12">
          <i-form-item
            label="是否主账号"
            :rules="{required: true, message: '是否主账号不能为空', trigger: 'change'}"
            prop="isMainAcctNo">
            <i-select v-model="formUser.isMainAcctNo" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--备注-->
        <i-col span="24">
          <i-form-item
            label="备注"
            prop="remark">
            <i-input type="textarea" v-model="formUser.remark"></i-input>
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
    props: {
      userData: Object
    },
    data() {
      return {
        isAdd: true,
        ShowModal: false,
        buttonLoading: false,
        dataLoading: false,
        bankSelect: [],
        formUser: {
          capitalNo: '', // 资方编号
          capitalName: '', // 资方名称
          acctname: '', // 账户名
          acctno: '', // 账号
          bankname: '', // 银行名称
          bankcode: '', // 银行编号
          openbankname: '', // 开户行
          openbankno: '', // 开户行号
          openbankclearingno: '', // 清算行号
          isMainAcctNo: '', // 是否主账号
          remark: '' // 备注
        },
        columns1: [
          {
            title: '账户名',
            align: 'center',
            key: 'acctname'
          },
          {
            title: '账号',
            key: 'acctno'
          },
          {
            title: '银行名称',
            key: 'bankcode',
            render: (h, params) => {
              return h('span', {}, params.row.bankname);
            }
          },
          {
            title: '开户行号',
            key: 'openbankno'
          },
          {
            title: '开户行',
            key: 'openbankname'
          },
          {
            title: '是否主账号',
            key: 'isMainAcctNo',
            render: (h, params) => {
              return h('span', {}, this.enumCode2Name(params.row.isMainAcctNo, 'YesNoEnum'));
            }
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
        data1: []
      };
    },
    mounted() {
      this.getPrivateCustomerList();
      this.getBankSelect(); // 获取银行名称枚举
    },
    methods: {
      selectChaengeFun(vals) {
        this.$data.formUser.bankcode = vals.value;
        this.$data.formUser.bankname = vals.label;
      },
      // 获取银行名称枚举
      async getBankSelect() {
        let resp = await this.$http.get('/common/support/bank/list');
        if (resp.success) {
          this.$data.bankSelect = resp.body;
        } else {
          this.$Notice.error({
            title: '拉取银行名称失败',
            duration: 2
          });
        }
      },
      // 查询列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.get('/pms/capital/accList', {
          capitalNo: this.userData.capitalNo
        });
        this.$data.dataLoading = false;
        if (resp.body.length !== 0) {
          this.$data.data1 = resp.body;
        } else {
          this.$Notice.warning({
            title: '列表没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 打开新增模态框
      openShowModal() {
        this.$data.isAdd = true;
        this.$data.ShowModal = true;
        this.$data.formUser = {};
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let dataObject = {};
        dataObject = {
          capitalNo: this.userData.capitalNo,
          capitalName: this.userData.capitalName,
          ...this.$data.formUser
        };
        let resAdd = await this.$http.post('/pms/capital/accSave', dataObject);
        this.$data.ShowModal = false;
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let dataObject = {};
        dataObject = {
          capitalNo: this.userData.capitalNo,
          capitalName: this.userData.capitalName,
          ...this.$data.formUser
        };
        let resAdd = await this.$http.post('/pms/capital/accSave', dataObject);
        this.$data.ShowModal = false;
        if (resAdd.success) {
          this.$data.buttonLoading = false; // 关闭按钮的loading状态
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 点击修改按钮
      setList(row) {
        this.$data.isAdd = false;
        this.$data.ShowModal = true;
        this.$data.formUser = row;
      },
      // 删除按钮
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/capital/accRemove', {
              id: row.id
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
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
      formCancel() {
        this.$data.ShowModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
