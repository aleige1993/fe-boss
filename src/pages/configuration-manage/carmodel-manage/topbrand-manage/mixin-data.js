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
          key: 'brandName'
        },
        {
          title: '排序',
          key: 'recommOrder'
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
                    Alertify.confirm('是否确认删除这条数据', async (ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/recomm/brand/del', {
                          no: params.row.recommNo
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
              }, '取消推荐')
            ]);
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
