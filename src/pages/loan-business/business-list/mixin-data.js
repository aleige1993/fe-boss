export default {
  data() {
    return {
      productList: [],
      customerColumns: [
        {
          title: '项目编号',
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'memberName',
          render: (h, params) => {
            return h('span', {}, params.row.memberName);
          }
        },
        {
          title: '经销商名称',
          key: 'merchantAbbr'
        },
        {
          title: '渠道商名称',
          key: 'channelName'
        },
        {
          title: '产品',
          key: 'productName'
        },
        {
          title: '期数(月)',
          key: 'applyPeriods',
          align: 'center',
          width: 90
        },
        {
          title: '申请金额（元）',
          key: 'applyAmt'
        },
        {
          title: '申请时间',
          key: 'applyTime',
          width: 110
        },
        /* {
          title: '渠道业务编号',
          key: 'orderNo',
          width: 130
        },*/
        {
          title: '来源渠道',
          key: 'loanChannel',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.loanChannel, 'BizChannelEnum'));
          }
        },
        {
          title: '任务送达时间',
          key: 'taskArriveTime',
          align: 'center',
          width: 110
        },
        {
          title: '已耗时',
          key: 'timeConsuming',
          width: 100
        },
        {
          title: '当前环节-状态',
          key: 'taskNode',
          width: 120,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum') + '-' + this.enumCode2Name(params.row.status, 'BizStatusEnum'));
          }
        }
        /*  {
          title: '当前处理人',
          key: 'mobile',
          width: 200
        }*/
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          // width: 150,
          align: 'center',
          render: (h, params) => {
            let statusText = '审批'; // this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum');
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: this.$data.applyApproveLoading,
                  disabled: (params.row.taskNode !== '3' && params.row.taskNode !== '4' && params.row.taskNode !== '5') ||
                    params.row.status === '9' || params.row.status === '4' || this.taskNode === '',
                  class: { 'hide': params.row.status === '9' }
                },
                style: { marginBottom: '5px' },
                on: {
                  click: async(e) => {
                    // let resp = await this.$http.post('/biz/holdUpLoanBizByLoanNo', { loanNo: params.row.loanNo });
                    this.$router.push({
                      path: '/index/loanbusiness/doapprove',
                      query: {
                        id: params.row.loanNo,
                        status: params.row.taskNode
                      },
                      force: true
                    });
                    // if (resp.success) {
                    //   this.$router.push({
                    //     path: '/index/loanbusiness/doapprove',
                    //     query: {
                    //       id: params.row.loanNo,
                    //       status: params.row.taskNode
                    //     },
                    //     force: true
                    //   });
                    // } else {
                    //   this.$Notice.error({
                    //     title: '错误提示', desc: '设置处理人失败请稍后重试'
                    //   });
                    // }
                  }
                }
              }, statusText),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.taskNode === '' || params.row.taskNode !== '2' || params.row.status !== '0'
                },
                style: { marginBottom: '5px' },
                on: {
                  click: async() => {
                    Alertify.confirm('确定要撤回吗？', async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading('正在撤回', 0);
                        let resp = await this.$http.post('/biz/recallByLoanNo', { loanNo: params.row.loanNo });
                        msg();
                        if (resp.success) {
                          this.$Message.success('撤回成功');
                          this.getPrivateCustomerLoanList();
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
                style: { marginBottom: '5px' },
                on: {
                  click: () => {
                    // console.log(params.row);
                    this.$router.push({
                      path: '/index/loanbusiness/detail',
                      query: {
                        id: params.row.loanNo,
                        status: params.row.taskNode,
                        from: 'detail',
                        tabs: encodeURIComponent(this.detailtabs)
                      }
                    });
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  disabled: this.taskNode === '' || params.row.taskNode !== '1' || params.row.status === '9'
                },
                style: { marginBottom: '5px' },
                on: {
                  click: async() => {
                    this.$router.push({
                      path: '/index/loanbusiness/accept',
                      query: {
                        id: params.row.loanNo
                      },
                      force: true
                    });
                    // let resp = await this.$http.post('/biz/holdUpLoanBizByLoanNo', { loanNo: params.row.loanNo });
                    // if (resp.success) {
                    //   this.$router.push({
                    //     path: '/index/loanbusiness/accept',
                    //     query: {
                    //       id: params.row.loanNo
                    //     },
                    //     force: true
                    //   });
                    // } else {
                    //   this.$Notice.error({
                    //     title: '错误信息',
                    //     desc: '设置处理人出错'
                    //   });
                    // }
                  }
                }
              }, '处理'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.taskNode === '' || params.row.taskNode !== '0' || params.row.status === '9'
                },
                style: { marginBottom: '5px' },
                on: {
                  click: () => {
                    Alertify.confirm('您确定要领取任务？', async ok => {
                      if (ok) {
                        let resp = await this.$http.post('/biz/gainLoanBizByLoanNo', { loanNo: params.row.loanNo });
                        if (resp.success) {
                          this.$Message.success('领取任务成功');
                          this.getPrivateCustomerLoanList();
                        }
                      }
                    });
                  }
                }
              }, '领取任务'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.taskNode === '' || params.row.taskNode !== '1' || params.row.status !== '9'
                },
                style: { marginBottom: '5px' },
                on: {
                  click: () => {
                    Alertify.confirm('确定删除当前客户吗？', async(ok) => {
                      if (ok) {
                        let resp = await this.$http.post('/biz/deleteByLoanNo', {
                          loanNo: params.row.loanNo
                        });
                        if (resp.success) {
                          this.getPrivateCustomerLoanList();
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
