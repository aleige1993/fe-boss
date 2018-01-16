export default {
  data() {
    return {
      customerColumns: [
        {
          title: '品牌ID',
          key: 'brandNo'
        },
        {
          title: '品牌名称',
          key: 'brandName',
          align: 'center'
        },
        {
          title: '首字母',
          key: 'initial',
          align: 'center'
        },
        {
          title: '品牌LOGO',
          key: 'logo',
          align: 'center',
          render: (h, params) => {
            return h('bs-big-img', {
              attrs: {
                style: 'margin:10px 0'
              },
              props: {
                // thumbWidth: 100,
                thumbHeight: 80,
                fullWidth: 1000,
                thumb: params.row.logo,
                full: params.row.logo
              }
            });
          }
        },
        {
          title: '创建时间',
          key: 'gmtCreate'
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
                        let resp = await this.$http.post('/ces/brand/del', {
                          no: params.row.brandNo
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
