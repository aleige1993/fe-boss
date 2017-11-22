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
      bankAccountDatas: []
    };
  }
};
