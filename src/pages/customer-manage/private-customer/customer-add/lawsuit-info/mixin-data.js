export default {
  data() {
    return {
      bankAccountColumns: [
        {
          title: '立案时间',
          key: 'companyNo'
        },
        {
          title: '立案原因',
          key: 'companyName'
        },
        {
          title: '案件金额',
          key: 'creditNo'
        },
        {
          title: '案件角色',
          key: 'relationShip'
        },
        {
          title: '录入人',
          key: 'contact'
        },
        {
          title: '录入时间',
          key: 'phone'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert('删除' + params.index);
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
