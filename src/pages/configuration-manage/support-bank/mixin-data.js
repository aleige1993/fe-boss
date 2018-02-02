export default {
  data() {
    return {
      customerColumns: [
        {
          title: '银行名称',
          key: 'bankName'
        },
        {
          title: '银行编码',
          key: 'bankCode'
        },
        {
          title: '银行logo',
          key: 'bannerUrl',
          align: 'center',
          render: (h, params) => {
            return h('bs-big-img', {
              attrs: {
                style: 'margin:10px 0'
              },
              props: {
                thumbHeight: 40,
                fullWidth: 1000,
                thumb: params.row.bannerUrl,
                full: params.row.bannerUrl
              }
            });
          }
        },
        {
          title: '是否启用',
          key: 'status',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return this.enumCode2Name(params.row.status, 'YesNoEnum');
          }
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
              }, '修改')
              // h('Button', {
              //   props: {
              //     type: 'error',
              //     size: 'small'
              //   },
              //   // style: { marginRight: '5px' },
              //   on: {
              //     click: () => {
              //       Alertify.confirm('是否确认删除这条数据', async(ok) => {
              //         if (ok) {
              //           const loading = this.$Message.loading('处理中...', 0);
              //           let resp = await this.$http.post('/cfg/banner/remove', {
              //             id: params.row.id
              //           });
              //           loading();
              //           if (resp.success) {
              //             this.$Message.success('删除成功');
              //             this.getProxyPayList();
              //           }
              //         }
              //       });
              //     }
              //   }
              // }, '删除')
            ]);
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
