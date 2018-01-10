export default {
  data() {
    return {
      customerColumns: [
        {
          title: '品牌ID',
          key: 'smsContent'
        },
        {
          title: '品牌名称',
          key: 'triggerPoint'
        },
        {
          title: '品牌分类',
          key: 'aliSmsId'
        },
        {
          title: '品牌LOGO',
          key: 'activeStatus'
        },
        {
          title: '创建时间',
          key: 'gmtModified'
        },
        {
          title: '来源方式',
          key: 'gmtModified'
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 160,
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
                    this.$data.isAdd = false;
                    this.$data.addModal = true;
                    this.$data.fromData = params.row;
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                // style: { marginRight: '5px' },
                on: {
                  click: () => {
                    Alertify.confirm('是否确认删除这条数据', async (ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/cfg/smsTemplate/remove', {
                          templateNo: params.row.templateNo
                          // templateNo: '400642986955767808'
                        });
                        loading();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getProxyPayList();
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
