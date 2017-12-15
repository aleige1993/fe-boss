export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          key: 'merchantNo'
        },
        {
          title: '渠道商类型',
          key: 'merchantType'
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
          key: 'suCreditCode'
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
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          key: 'merchantStatus'
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
          'merchantNo': '11111111', // 渠道商编号
          'merchantType': '1', // 渠道商类型 1.4S店2.一网商3.二网商
          'corpNo': '111111', // 公司编号
          'corpName': '111111', // 公司名称
          'suCreditCode': '111111', // 统一社会信用代码
          'legalPerson': '111111', // 法定代表人
          'regDate': '2017-12-16', // 注册时间
          'regCapital': '900000', // 注册资金
          'telephone': '02388888888', // 公司电话
          'merchantStatus': '0', // 授信状态
          'custMgrName': '11111111' // 客户经理编号
        }
      ]
    };
  }
};
