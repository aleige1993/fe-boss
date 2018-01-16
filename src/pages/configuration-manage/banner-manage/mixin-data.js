export default {
  data() {
    return {
      customerColumns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '外部URL',
          key: 'linkUrl'
        },
        {
          title: '图片展示',
          key: 'bannerUrl',
          align: 'center',
          render: (h, params) => {
            return h('bs-big-img', {
              attrs: {
                style: 'margin:10px 0'
              },
              props: {
                thumbHeight: 80,
                fullWidth: 1000,
                thumb: params.row.bannerUrl,
                full: params.row.bannerUrl
              }
            });
          }
        },
        {
          title: '是否激活',
          key: 'activeStatus',
          render: (h, params) => {
            if (params.row.activeStatus === '1') {
              return '是';
            } else {
              return '否';
            }
          }
        },
        {
          title: '排序',
          key: 'index'
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
                    Alertify.confirm('是否确认删除这条数据', async (ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/cfg/banner/remove', {
                          id: params.row.id
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
