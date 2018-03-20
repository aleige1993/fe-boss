export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '账户名',
          key: 'acctName'
        },
        {
          title: '账号',
          key: 'acctNo'
        },
        {
          title: '银行名称',
          key: 'bankName'
        },
        {
          title: '开户行号',
          key: 'openBankNo'
        },
        {
          title: '开户行',
          key: 'openBankName'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    Object.assign(this.$data.formData, params.row);
                    this.$data.addBankModal = true;
                    this.$data.isAdd = false;
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    Alertify.confirm('确定要删除吗？', async(ok) => {
                      if (ok) {
                        const loadingMsg = this.$Message.loading('删除中...', 0);
                        let resp = await this.$http.post('/merchant/acct/delete', {
                          merchantNo: this.$route.query.merchantNo,
                          acctNo: params.row.acctNo
                        });
                        loadingMsg();
                        if (resp.success) {
                          this.$Message.success('删除银行账户信息成功');
                          this.getCustomerBankList();
                        }
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      bankAccountDatas: []
    };
  }
};
