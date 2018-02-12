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
        /* {
          title: '客户名称',
          width: '180',
          align: 'center',
          key: 'merchantName'
        },*/
        {
          title: '用户名称',
          key: 'userName'
        },
        {
          title: '操作员等级',
          key: 'userLevel',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.userLevel, 'MerchantOperatorLevelEnum'));
          }
        },
        {
          title: '手机号',
          key: 'userMobile'
        },
        {
          title: '身份证号码',
          key: 'idCardNo'
        },
        {
          title: '启停状态',
          width: '90',
          key: 'useStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.useStatus, 'EnableStatusEnum'));
          }
        },
        {
          title: '二维码',
          width: 130,
          key: 'qrCodeUrl',
          render: (h, params) => {
            return h('div', [
              h('bs-big-img', {
                props: {
                  thumbWidth: 90,
                  thumbHeight: 90,
                  thumb: params.row.qrCodeUrl,
                  full: params.row.qrCodeUrl
                },
                style: {
                  'paddingTop': '10px'
                }
              }),
              h('br', {}),
              h('a', {
                props: {
                  display: 'block',
                  href: 'params.row.qrCodeUrl',
                  target: '_blank'
                },
                style: {
                  'textDecoration': 'underline'
                },
                on: {
                  click: () => {
                    window.open(params.row.qrCodeUrl, '_blank');
                  }
                }
              }, '预览/下载二维码')
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
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
                          userNo: params.row.userNo
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
                  type: params.row.useStatus === '0' ? 'primary' : 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let useStatus = params.row.useStatus === '0' ? '1' : '0'; // 0:冻结,1:激活
                    let text = params.row.useStatus === '0' ? '激活' : '冻结';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}`, 0);
                        let resp = await this.$http.get('/merchant/operator/status', {
                          merchantNo: params.row.merchantNo,
                          userNo: params.row.userNo,
                          useStatus
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
              }, params.row.useStatus === '0' ? '激活' : '冻结'), // status 1激活  2冻结  3草稿,
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.adminSet($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.adminRomove($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
