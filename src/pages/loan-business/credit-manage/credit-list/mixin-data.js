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
          width: 260,
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
                  click: async () => {
                    let status = params.row.status === '1' ? '2' : '1';
                    let text = params.row.status === '1' ? '冻结' : '激活';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async (ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}`, 0);
                        let resp = await this.$http.post('/credit/delete', {
                          memberNo: params.row.memberNo,
                          status
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getCompanyCreditList();
                        }
                      }
                    });
                  }
                }
              }, '撤回'),
              h('Button', {
                props: {
                  type: 'success',
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
                      path: '/index/customer/update',
                      query: {
                        id: params.row.memberNo,
                        from: 'modify'
                      },
                      force: true
                    });
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
                    Alertify.confirm('确定删除当前授信申请吗？', async (ok) => {
                      if (ok) {
                        let resp = await this.$http.post('/credit/delete', {
                          creditApplyNo: params.row.creditApplyNo
                        });
                        if (resp.success) {
                          this.getCompanyCreditList();
                        }
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      privateCustomerList: []
    };
  }
};
