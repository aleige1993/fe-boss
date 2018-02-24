export default {
  data() {
    return {
      customerColumns: [
        {
          type: '序号',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return (this.$data.searchForm.currentPage - 1) * this.$data.searchForm.pageSize + params.index + 1;
          }
        },
        {
          title: '二级指标名称',
          key: 'secondLevelTarget'
        },
        {
          title: '一级指标',
          key: 'firstLevelTarget'
        },
        {
          title: '满分',
          key: 'score'
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 220,
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
                    params.row.score = params.row.score + '';
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
                        let resp = await this.$http.post('/cfg/qualificationAssess/removeTarget', {
                          secondLevelNo: params.row.secondLevelNo
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
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                // style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/conf/limitestimate/settingitem',
                      query: {
                        id: params.row.secondLevelNo,
                        name: params.row.secondLevelTarget
                      }
                    });
                  }
                }
              }, '子选项')
            ]);
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
