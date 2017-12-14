export default {
  data() {
    return {
      customerColumns: [
        {
          title: '项目编号',
          key: 'loanNo',
          width: 200
        },
        {
          title: '客户类型',
          key: 'custType',
          width: 90,
          render: (h, params) => {
            if (params.row.custType === '1') {
              return '个人客户';
            } else {
              return '公司客户';
            }
          }
        },
        {
          title: '客户名称',
          key: 'memberName',
          width: 200,
          render: (h, params) => {
            if (params.row.custType === '1') {
              return params.row.memberName;
            } else {
              return params.row.corpName;
            }
          }
        },
        {
          title: '证件类型',
          width: 120,
          key: 'certType',
          render: (h, params) => {
            if (params.row.custType === '1') {
              return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
            } else {
              return '统一社会信用代码';
            }
          }
        },
        {
          title: '证件号码',
          key: 'certNo',
          width: 200,
          render: (h, params) => {
            if (params.row.custType === '1') {
              return params.row.certNo;
            } else {
              return params.row.creditCode;
            }
          }
        },
        {
          title: '产品',
          key: 'productName',
          width: 200
        },
        {
          title: '期数',
          key: 'applyPeriods',
          width: 200
        },
        {
          title: '申请金额（元）',
          key: 'applyAmt',
          width: 200
        },
        {
          title: '申请时间',
          key: 'applyTime',
          width: 200
        },
        {
          title: '任务送达时间',
          key: 'taskArriveTime',
          width: 120
        },
        {
          title: '已耗时',
          key: 'taskArriveTime',
          width: 120
        }/*,
        {
          title: '当前环节',
          key: 'taskNode',
          width: 120
        },
        {
          title: '当前处理人',
          key: 'mobile',
          width: 200
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }*/
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
                        let resp = await this.$http.post('/member/change/status', {
                          memberNo: params.row.memberNo,
                          status
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getPrivateCustomerList();
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
                      path: '/index/customer/detail',
                      query: {
                        id: params.row.memberNo,
                        from: 'detail'
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
                    Alertify.confirm('确定删除当前客户吗？', async (ok) => {
                      if (ok) {
                        let resp = await this.$http.post('/member/delete', {
                          memberNo: params.row.memberNo
                        });
                        if (resp.success) {
                          this.getPrivateCustomerList();
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
      privateCustomerLoanList: []
    };
  }
};
