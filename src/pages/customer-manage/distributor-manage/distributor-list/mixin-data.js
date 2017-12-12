export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          key: 'distributorNo'
        },
        {
          title: '客户编号',
          key: 'distributorNo'
        },
        {
          title: '公司名称',
          key: 'distributorNo'
        },
        {
          title: '统一社会信用代码\n',
          key: 'distributorNo'
        },
        {
          title: '法定代表人',
          key: 'distributorNo'
        },
        {
          title: '注册时间',
          key: 'distributorNo'
        },
        {
          title: '注册资金',
          key: 'distributorNo'
        },
        {
          title: '公司电话',
          key: 'distributorNo'
        },
        {
          title: '状态',
          key: 'distributorNo'
        },
        {
          title: '操作',
          width: 340,
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    alert(params.row.distributorNo);
                  }
                }
              }, '详情'),
              h('i-button', {
                props: {
                  type: 'success'
                },
                on: {
                  click: () => {
                    alert(params.row.distributorNo);
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    alert(params.row.distributorNo);
                  }
                }
              }, '删除'),
              h('i-button', {
                props: {
                  type: 'warning'
                },
                on: {
                  click: () => {
                    alert(params.row.distributorNo);
                  }
                }
              }, '激活/冻结'),
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    alert(params.row.distributorNo);
                  }
                }
              }, '操作员管理')
            ]);
          }
        }
      ],
      distributorList: [
        {
          distributorNo: '1243',
          action: '111'
        }
      ]
    };
  }
};
