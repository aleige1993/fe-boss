export default {
  data() {
    return {
      columns1: [
        {
          title: '渠道商编号',
          align: 'center',
          key: 'merchantNo'
        },
        {
          title: '登录账号', // 公司编号
          key: 'corpNo'
        },
        {
          title: '操作员类型',
          key: 'adminType',
          render: (h, params) => {
            let test = '超级管理员';
            if (params.row.adminType === '1') {
              test = '超级管理员';
            } else if (params.row.adminType === '2') {
              test = '普通用户';
            }
            return h('span', {}, test);
          }
        },
        {
          title: '状态', // 0:冻结,1:激活
          key: 'status',
          render: (h, params) => {
            return h('span', {}, params.row.status === '0' ? '冻结' : '激活');
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.resetPas($.extend({}, params.row));
                    Alertify.confirm('确定要重置密码吗？', async (ok) => {
                      if (ok) {
                        const msg = this.$Message.loading('正在重置密码', 0);
                        let resp = await this.$http.post('/updateCorpStatus', {
                          corpNo: params.row.corpNo,
                          status
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
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let status = params.row.status === '1' ? '2' : '1';
                    let text = params.row.status === '1' ? '冻结' : '激活';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async (ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}`, 0);
                        let resp = await this.$http.post('/updateCorpStatus', {
                          corpNo: params.row.corpNo,
                          status
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success(`${text}成功`);
                          this.getCompanyCustomerList();
                        }
                      }
                    });
                  }
                }
              }, params.row.status === '1' ? '冻结' : '激活') // status 1激活  2冻结  3草稿
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
