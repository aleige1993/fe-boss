export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          key: 'merchantNo'
        },
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
          key: 'merchantNo'
        },
        {
          title: '法定代表人',
          key: 'merchantNo'
        },
        {
          title: '注册时间',
          key: 'merchantNo'
        },
        {
          title: '注册资金',
          key: 'merchantNo'
        },
        {
          title: '公司电话',
          key: 'merchantNo'
        },
        {
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          key: 'merchantNo'
        },
        {
          title: '操作',
          width: 260,
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
                    this.$router.push({
                      path: '/index/customer/distributor/details',
                      query: {
                        corpNo: params.row.corpNo, // 公司编号
                        memberNo: params.row.memberNo,
                        merchantNo: params.row.merchantNo, // 渠道商编号
                        from: 'detail'
                      }
                    });
                  }
                }
              }, '详情'),
              h('i-button', {
                props: {
                  type: 'success'
                },
                on: {
                  click: () => {
                    alert(params.row.merchantNo);
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    alert(params.row.merchantNo);
                  }
                }
              }, '删除'),
              h('i-button', {
                props: {
                  type: 'warning'
                },
                on: {
                  click: () => {
                    alert(params.row.merchantNo);
                  }
                }
              }, '激活/冻结')
              /*h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    alert(params.row.merchantNo);
                  }
                }
              }, '操作员管理')*/
            ]);
          }
        }
      ],
      distributorList: [
        {
          corpNo: '111111', // 公司编号
          corpName: '111111', // 公司名称
          custMgrNo: '111111', // 客户经理编号
          custMgrName: '111111', // 客户经理名称
          memberNo: '1111',
          merchantNo: '1243',
          action: '111'
        }
      ]
    };
  }
};
