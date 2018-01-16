export default {
  data() {
    return {
      columns1: [
        {
          title: '渠道商编号',
          width: '180',
          align: 'center',
          key: 'merchantNo'
        },
        {
          title: '登录账号', // 公司编号
          key: 'operatorCode'
        },
        {
          title: '操作员类型',
          key: 'operatorType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.operatorType, 'OperatorTypeEnum'));
          }
        },
        {
          title: '状态', // 0:冻结,1:激活
          width: '80',
          key: 'operatorStatus',
          render: (h, params) => {
            return h('span', {}, params.row.operatorStatus === '0' ? '冻结' : '激活');
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    Alertify.confirm('确定要重置密码吗？', async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading('正在重置密码', 0);
                        let resp = await this.$http.get('/merchant/operator/resetPsw', {
                          merchantNo: params.row.merchantNo,
                          operatorCode: params.row.operatorCode
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('重置密码成功');
                          this.getList();
                        }
                      }
                    });
                  }
                }
              }, '重置密码'),
              h('Button', {
                props: {
                  type: params.row.operatorStatus === '0' ? 'primary' : 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let operatorStatus = params.row.operatorStatus === '0' ? '1' : '0'; // 0:冻结,1:激活
                    let text = params.row.operatorStatus === '0' ? '激活' : '冻结';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}`, 0);
                        let resp = await this.$http.get('/merchant/operator/status', {
                          merchantNo: params.row.merchantNo,
                          operatorCode: params.row.operatorCode,
                          operatorStatus
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success(`${text}成功`);
                          this.getList();
                        }
                      }
                    });
                  }
                }
              }, params.row.operatorStatus === '0' ? '激活' : '冻结') // status 1激活  2冻结  3草稿
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
