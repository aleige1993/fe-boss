export default {
  data() {
    return {
      customerColumns: [
        {
          title: '项目编号',
          key: 'memberNo',
          width: 200
        },
        {
          title: '主借人',
          key: 'name',
          width: 200
        },
        {
          title: '证件类型',
          width: 120,
          key: 'certType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号',
          key: 'certNo',
          width: 200
        },
        {
          title: '产品',
          key: 'mobile',
          width: 200
        },
        {
          title: '期数',
          key: 'mobile',
          width: 200
        },
        {
          title: '申请金额（元）',
          key: 'mobile',
          width: 200
        },
        {
          title: '申请时间',
          key: 'mobile',
          width: 200
        },
        {
          title: '当前欢姐',
          key: 'mobile',
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
      privateCustomerList: []
    };
  }
};