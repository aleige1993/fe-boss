export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '公司编号',
          key: 'accountName'
        },
        {
          title: '公司名称',
          key: 'accountNo'
        },
        {
          title: '统一社会信用代码',
          key: 'bankName'
        },
        {
          title: '关系',
          key: 'bankNo'
        },
        {
          title: '联系人',
          key: 'bankBranchName'
        },
        {
          title: '联系电话',
          key: 'bankBranchName'
        },
        {
          title: '注册时间',
          key: 'bankBranchName'
        },
        {
          title: '注册资金',
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
  }
};
