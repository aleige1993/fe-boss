export default {
  data() {
    return {
      companyCustomerColumns: [
        {
          title: '客户编号',
          key: 'corpNo'
        },
        {
          title: '公司名称',
          key: 'corpName'
        },
        {
          title: '统一社会信用代码',
          key: 'creditCode',
          width: 150
        },
        {
          title: '法定代表人',
          key: 'legalPerson'
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
          title: '公司电话',
          key: 'telephone'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }
      ],
      companyCustomerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          fixed: true,
          className: '',
          render: (h, params) => {
            if (this.type === 'modal') {
              return '';
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/customer/modify',
                      query: {
                        id: params.row.id,
                        from: 'detail'
                      }
                    });
                    // this.remove(params.index);
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }, '激活/冻结')
            ]);
          }
        }
      ],
      companyCustomerData: []
    };
  }
};
