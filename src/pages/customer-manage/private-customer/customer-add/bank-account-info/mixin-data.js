export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '账户名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'bankCardNo'
        },
        {
          title: '银行名称',
          key: 'bankName'
        },
        {
          title: '开户行号',
          key: 'openBankCode'
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
                    this.$data.formData = params.row;
                    this.$data.addBankModal = true;
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
                    Alertify.confirm('确定要删除吗？', async (ok) => {
                      if (ok) {
                        let recordId = params.row.id;
                        const loadingMsg = this.$Message.loading('删除中...', 0);
                        let resp = await this.$http.post('/member/account/delete', {
                          recordId: params.row.id
                        });
                        if (resp.success) {
                          loadingMsg();
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
