export default {
  data() {
    return {
      companyCustomerColumns: [
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
          key: 'creditCode',
          width: 150
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
          title: '注册资金(万元)',
          key: 'regCapital'
        },
        {
          title: '公司电话',
          key: 'telephone'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }
      ],
      companyCustomerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          fixed: true,
          className: '',
          render: (h, params) => {
            if (this.type === 'modal') {
              return '';
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/customer/companycustomer/modify',
                      query: {
                        id: params.row.corpNo,
                        name: params.row.corpName,
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
                      path: '/index/customer/companycustomer/modify',
                      query: {
                        id: params.row.corpNo,
                        name: params.row.corpName
                      }
                    });
                    // this.remove(params.index);
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
                    Alertify.confirm('确定要删除当前客户吗', async ok => {
                      if (ok) {
                        const msg = this.$Message.loading('正在删除客户...', 0);
                        let resp = await this.$http.post('/corp/deleteCorp', {
                          corpNo: params.row.corpNo
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getCompanyCustomerList();
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
                  click: () => {
                    // let status = params.row.status === '1' ? '2' : '1';
                    let text = params.row.status === '1' ? '冻结' : '激活';
                    Alertify.confirm(`确定要${text}当前用户吗？`, async(ok) => {
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
      companyCustomerData: []
    };
  }
};
