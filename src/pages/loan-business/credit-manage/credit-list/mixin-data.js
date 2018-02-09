import CreditConst from '../credit-const';
export default {
  data() {
    return {
      customerColumns: [
        {
          title: '客户编号',
          key: 'corpNo'
        },
        {
          title: '客户名称',
          key: 'corpName'
        },
        {
          title: '统一社会信用代码',
          key: 'creditCode'
        },
        {
          title: '授信总额度（元）',
          key: 'totalLimitAmt'
        },
        {
          title: '当前可用额度（元）',
          key: 'currentLimitAmt'
        },
        {
          title: '授信起始日期',
          key: 'startDate'
        },
        {
          title: '授信结束日期',
          key: 'endDate'
        },
        {
          title: '额度释放方式',
          key: 'creditLimitReleaseMode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.creditLimitReleaseMode, 'CreditFreedTypeEnum'));
          }
        },
        {
          title: '当前处理人',
          key: 'handleUserName'
        },
        {
          title: '当前环节',
          key: 'taskName'
        },
        {
          title: '授信状态',
          key: 'creditStatus',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.creditStatus, 'CreditAuditStatusEnum'));
          }
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let statusText = '处理';// this.enumCode2Name(params.row.creditStatus, 'CreditAuditStatusEnum');
            return h('div', [
              // 撤回申请
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.creditStatus !== CreditConst.APPLY_CODE && params.row.creditStatus !== CreditConst.FIRST_APPROVE_PENDDING_CODE,
                  class: { 'hide': params.row.creditStatus !== CreditConst.APPLY_CODE && params.row.creditStatus !== CreditConst.FIRST_APPROVE_PENDDING_CODE }
                },
                style: { marginTop: '5px' },
                on: {
                  click: async() => {
                    Alertify.confirm('确定要撤销当前申请吗？', async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading('正在撤销授信申请', 0);
                        let resp = await this.$http.post('/credit/cancel', {
                          creditLimitNo: params.row.creditLimitNo
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('撤销成功');
                          this.getCompanyCreditList();
                        }
                      }
                    });
                  }
                }
              }, '撤回'),
              // 查看详情,
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: { marginTop: '5px' },
                on: {
                  click: () => {
                    // console.log(params.row);
                    this.$router.push({
                      path: '/index/loanbusiness/credit/detail',
                      query: {
                        id: params.row.creditLimitApplyNo
                      }
                    });
                  }
                }
              }, '详情'),
              // 修改审批信息
              /* h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  disabled: params.row.creditStatus !== '2' && params.row.creditStatus !== '3',
                  class: { 'hide': params.row.creditStatus !== '2' && params.row.creditStatus !== '3' }
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/loanbusiness/credit/apply',
                      query: {
                        id: params.row.creditLimitApplyNo
                      },
                      force: true
                    });
                  }
                }
              }, '修改'),*/
              // 审批
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: this.$data.applyApproveLoading,
                  disabled: params.row.creditStatus !== '3' &&
                  params.row.creditStatus !== '4' &&
                  params.row.creditStatus !== '5' &&
                  params.row.creditStatus !== '6' &&
                  params.row.creditStatus !== '7' &&
                  params.row.creditStatus !== '8'
                },
                style: { marginTop: '5px' },
                on: {
                  click: async() => {
                    this.$data.applyApproveLoading = true;
                    let resp = await this.$http.post('/credit/settingHandleUser', { creditLimitApplyNo: params.row.creditLimitApplyNo });
                    this.$data.applyApproveLoading = false;
                    if (resp.success) {
                      this.$router.push({
                        path: '/index/loanbusiness/credit/doapprove',
                        query: {
                          id: params.row.creditLimitApplyNo,
                          status: params.row.creditStatus
                        },
                        force: true
                      });
                    } else {
                      this.$Notice.error({
                        title: '错误提示',
                        desc: '设置处理人失败请稍后重试'
                      });
                    }
                  }
                }
              }, statusText),
              // 删除授信申请
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: params.row.creditStatus !== '2' &&
                  params.row.creditStatus !== '3' &&
                  params.row.creditStatus !== '97' &&
                  params.row.creditStatus !== '98' &&
                  params.row.creditStatus !== '99'
                },
                style: { marginTop: '5px' },
                on: {
                  click: () => {
                    Alertify.confirm('确定删除当前授信申请吗？', async(ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('正在删除授信申请', 0);
                        let resp = await this.$http.post('/credit/delete', {
                          creditLimitApplyNo: params.row.creditLimitApplyNo
                        });
                        loading();
                        if (resp.success) {
                          this.$Message.success('删除授信申请成功');
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
