export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '股东姓名',
          key: 'accountName'
        },
        {
          title: '股东类别',
          key: 'accountNo'
        },
        {
          title: '出资额（元）',
          key: 'bankName'
        },
        {
          title: '出资方式',
          key: 'bankNo'
        },
        {
          title: '持股比例（%）',
          key: 'bankNo'
        },
        {
          title: '备注',
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
