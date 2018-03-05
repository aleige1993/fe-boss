export default {
  data() {
    return {
      customerColumns: [
        {
          title: '客户编号',
          key: 'memberNo'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.sex, 'SexEnum'));
          }
        },
        {
          title: '证件类型',
          key: 'certType',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'certNo'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 300,
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
                  click: () => {
                    // console.log(params.row);
                    this.$router.push({
                      path: '/index/customer/privatecustomer/detail',
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
                      path: '/index/customer/privatecustomer/update',
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
                    Alertify.confirm('确定删除当前客户吗？', async(ok) => {
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
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: async() => {
                    let status = params.row.status === '1' ? '2' : '1';
                    let text = params.row.status === '1' ? '冻结' : '激活';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}`, 0);
                        let resp = await this.$http.post('/member/change/status', {
                          memberNo: params.row.memberNo,
                          status
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success(text + '成功');
                          this.getPrivateCustomerList();
                        }
                      }
                    });
                  }
                }
              }, params.row.status === '1' ? '冻结' : '激活')
            ]);
          }
        }
      ],
      privateCustomerList: []
    };
  }
};
