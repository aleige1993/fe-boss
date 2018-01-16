export default {
  data() {
    return {
      customerColumns: [
        // {
        //   title: 'NO',
        //   key: 'templateNo'
        // },
        {
          title: '短信内容',
          key: 'smsContent'
        },
        {
          title: '触发点',
          key: 'triggerPoint',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.triggerPoint, 'smsTriggerPointEnum'));
          }
        },
        {
          title: '阿里云模板ID',
          key: 'aliSmsId'
        },
        {
          title: '是否自动触发',
          key: 'autoTrigger',
          render: (h, params) => {
            if (params.row.autoTrigger === '1') {
              return '是';
            } else {
              return '否';
            }
          }
        },
        {
          title: '操作时间',
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
                    this.$data.fromData = $.extend({}, params.row);
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
                    Alertify.confirm('是否确认删除这条数据', async(ok) => {
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
