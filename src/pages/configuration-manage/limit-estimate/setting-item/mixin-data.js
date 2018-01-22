export default {
  data() {
    return {
      customerColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '二级指标名称',
          key: 'name',
          render: (h, params) => {
            return this.$data.name;
          }
        },
        {
          title: '子项名称',
          key: 'scoreName'
        },
        {
          title: '评分方案',
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 0) {
              return '固定值';
            } else {
              return '比例*满分';
            }
          }
        },
        {
          title: '评分值',
          key: 'scoreRatio'
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
                        let resp = await this.$http.post('/cfg/qualificationAssess/removeScore', {
                          scoreNo: params.row.scoreNo
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
