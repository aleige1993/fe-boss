export default {
  data() {
    return {
      customerColumns: [
        {
          title: '客户编号',
          key: 'companyNo',
          width: 200
        },
        {
          title: '客户名称',
          key: 'companyName',
          width: 200
        },
        {
          title: '统一社会信用代码',
          width: 200,
          key: 'creditCode'
        },
        {
          title: '授信总额度（元）',
          key: 'countLimit',
          width: 200
        },
        {
          title: '当前可用额度（元）',
          key: 'surplusCountLimit',
          width: 200
        },
        {
          title: '单笔最大额度（元）',
          key: 'singleLimit',
          width: 200
        },
        {
          title: '授信起始日期',
          key: 'startDate',
          width: 200
        },
        {
          title: '授信结束日期',
          key: 'endDate',
          width: 200
        },
        {
          title: '额度释放方式',
          key: 'creditLimitReleaseMode',
          width: 120
        },
        {
          title: '当前处理人',
          key: 'handleUserCode',
          width: 200
        },
        {
          title: '当前环节',
          key: 'tacheName',
          width: 200
        },
        {
          title: '授信状态',
          key: 'creditStatus',
          width: 120,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    // console.log(params.row);
                    this.$router.push({
                      path: '/index/loanbusiness/credit/detail',
                      query: {
                        id: params.row.creditApplyNo
                      }
                    });
                  }
                }
              }, '审批')
            ]);
          }
        }
      ],
      privateCustomerList: []
    };
  }
};
