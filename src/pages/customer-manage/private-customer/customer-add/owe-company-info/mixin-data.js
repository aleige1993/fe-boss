export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '公司编号',
          key: 'companyCode'
        },
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: '统一社会信用代码',
          key: 'suCreditCode'
        },
        {
          title: '关系',
          key: 'relative'
        },
        {
          title: '联系人',
          key: 'contactUser'
        },
        {
          title: '联系电话',
          key: 'contactUserPhone'
        },
        {
          title: '注册时间',
          key: 'regDate'
        },
        {
          title: '注册资金',
          key: 'regCapital'
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
                    Alertify.confirm('是否确定删除', async (ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('删除中...', 0);
                        let respn = await this.$http.post('/member/have/company/delete', {
                          recordId: params.row.id
                        });
                        loading();
                        if (respn.success) {
                          this.$Message.success('操作成功');
                          this.getOweComList();
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
