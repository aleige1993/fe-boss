export default {
  data() {
    return {
      isAdd: true,
      addModal: false,
      dataLoading: false,
      buttonLoading: false,
      total: 0,
      currentPage: 1,
      uploadFileName: '',
      searchForm: {
        'modelFullName': '',
        currentPage: 1,
        pageSize: 15
      },
      model: {
        logo: '',
        fileUploading: false
      },
      modelData: {
        id: null
      },
      customerColumns: [
        {
          title: '品牌名称',
          key: 'modelNo'
        },
        {
          title: '子品牌名称',
          key: 'modelNo'
        },
        {
          title: '车系名称',
          key: 'modelFullName'
        },
        {
          title: '车型名称',
          key: 'guidancePrice'
        },
        {
          title: '车辆颜色',
          key: 'guidancePrice'
        },
        {
          title: '生产年份',
          key: 'guidancePrice'
        },
        {
          title: '指导售价',
          key: 'guidancePrice'
        },
        {
          title: '车型图片',
          key: 'guidancePrice'
        },
        {
          title: '发动机排量',
          key: 'guidancePrice'
        }
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
                    const loading = this.$Message.loading('加载中...', 0);
                    let resp = await this.$http.post('/ces/model/detail', {
                      no: params.row.modelNo
                    });
                    loading();
                    if (resp.success) {
                      this.$data.modelData = resp.body;
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
                    Alertify.confirm('是否确认删除这条数据', async(ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/car/detail/del', {
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
