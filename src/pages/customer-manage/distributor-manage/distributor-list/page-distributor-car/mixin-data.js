export default {
  data() {
    return {
      columns1: [
        {
          title: '车型ID',
          align: 'center',
          key: 'modelNo'
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
          width: '120',
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
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.salesStatus === '0' ? 'primary' : 'warning',
                  size: 'small',
                  disabled: this.$data.isDetail
                },
                on: {
                  click: () => {
                    let status = params.row.salesStatus === '0' ? '1' : '0'; // 0停售，1在售
                    let text = params.row.salesStatus === '0' ? '在售' : '停售';
                    Alertify.confirm(`确定要${text}当前车型吗？`, async (ok) => {
                      if (ok) {
                        const msg = this.$Message.loading(`正在${text}请求...`, 0);
                        let resp = await this.$http.get('merchant/car/status', {
                          merchantNo: params.row.merchantNo,
                          salesStatus: status,
                          modelNo: params.row.modelNo
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success(`当前车型${text}成功`);
                          this.getPrivateCustomerList();
                        }
                      }
                    });
                  }
                }
              }, params.row.salesStatus === '0' ? '在售' : '停售'), // status 1激活  2冻结  3草稿
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.$data.isDetail
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
                  size: 'small',
                  disabled: this.$data.isDetail
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
