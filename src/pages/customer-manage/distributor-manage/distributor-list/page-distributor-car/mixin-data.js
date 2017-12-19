export default {
  data() {
    return {
      columns1: [
        {
          title: '车型ID',
          align: 'center',
          key: 'modelId'
        },
        {
          title: '车型名称',
          key: 'modelName'
        },
        {
          title: '厂商指导价（万元）',
          key: 'guidancePrice'
        },
        {
          title: '售价（万元）',
          key: 'sellingPrice'
        },
        {
          title: '销售状态', // 0停售，1在售
          align: 'center',
          key: 'salesStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.salesStatus, 'SalesStatusEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (this.$data.isDetail) {
              return;
            };
            return h('div', [
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
              }, this.status === '1' ? '冻结' : '激活'), // status 1激活  2冻结  3草稿
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
                    this.setList($.extend({}, params.row));
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
                    this.remove($.extend({}, params.row));
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
