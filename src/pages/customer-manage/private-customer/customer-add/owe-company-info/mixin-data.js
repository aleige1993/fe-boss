export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '公司编号',
          key: 'companyNo'
        },
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: '统一社会信用代码',
          key: 'creditNo'
        },
        {
          title: '关系',
          key: 'relationShip'
        },
        {
          title: '联系人',
          key: 'contact'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '注册时间',
          key: 'registerDate'
        },
        {
          title: '注册资金',
          key: 'registerMoney'
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
          companyNo: 'Joe Black',
          companyName: '25645415842142151',
          creditNo: '中国工商银行',
          relationShip: '客户',
          contact: '2254',
          phone: '上清寺支行',
          registerDate: '2017-12-25',
          registerMoney: 120500505
        }
      ]
    };
  }
};
