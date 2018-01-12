export default {
  data() {
    return {
      customerColumns: [
        {
          title: '车型编号',
          key: 'modelNo',
          width: 200
        },
        {
          title: '车型名称',
          key: 'modelFullName'
        },
        {
          title: '厂商指导价',
          key: 'guidancePrice',
          width: 200
        },
        // {
        //   title: '车型图片',
        //   key: 'logo',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('bs-big-img', {
        //       attrs: {
        //         style: 'margin:10px 0'
        //       },
        //       props: {
        //         // thumbWidth: 100,
        //         thumbHeight: 80,
        //         fullWidth: 1000,
        //         thumb: params.row.logo,
        //         full: params.row.logo
        //       }
        //     });
        //   }
        // },
        {
          title: '年份',
          key: 'seriesYear',
          width: 200
        },
        {
          title: '创建时间',
          key: 'gmtCreate',
          width: 200
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
                  click: async() => {
                    this.$data.isAdd = false;
                    this.$data.addModal = true;
                    // this.$data.fromData = params.row;
                    const loading = this.$Message.loading('加载中...', 0);
                    let resp = await this.$http.post('/ces/model/detail', {
                      no: params.row.modelNo
                    });
                    loading();
                    if (resp.success) {
                      this.$data.fromData = resp.body;
                    }
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
                        let resp = await this.$http.post('/ces/brand/del', {
                          brandNo: params.row.brandNo
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
