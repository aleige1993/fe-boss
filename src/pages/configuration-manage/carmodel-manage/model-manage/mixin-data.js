export default {
  data() {
    return {
      addTypeModal: false, // 选择添加类型
      addTypeData: '',
      isAdd: true, // 新车
      addModal: false,
      buttonLoading: false,
      modelData: {},
      modelDataInit: {
        id: null,
        childBrandName: '',
        fileUploading: false
      },
      isSecondAdd: false, // 二手车
      addSecondModal: false,
      secondButtonLoading: false,
      secondModelData: {},
      total: 0,
      currentPage: 1,
      dataLoading: false,
      searchForm: {
        'modelFullName': '',
        'seriesName': '',
        'seriesGroupName': '',
        'brandName': '',
        currentPage: 1,
        pageSize: 15
      },
      customerColumns: [
        {
          title: '品牌名称',
          key: 'brandName'
        },
        {
          title: '子品牌名称',
          key: 'seriesGroupName'
        },
        {
          title: '车系名称',
          key: 'seriesName'
        },
        {
          title: '车型名称',
          key: 'modelName'
        },
        {
          title: '生产年份',
          key: 'seriesYear'
        },
        {
          title: '指导售价',
          key: 'guidancePrice'
        },
        {
          title: '车型图片',
          key: 'modelImg',
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
                thumb: params.row.modelImg,
                full: params.row.modelImg
              }
            });
          }
        },
        {
          title: '发动机排量',
          key: 'engineExhaustForFloat'
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
                    const loading = this.$Message.loading('加载中...', 0);
                    let resp = await this.$http.post('/ces/model/detail', {
                      no: params.row.modelNo
                    });
                    loading();
                    if (resp.success) {
                      this.$data.modelData = $.extend({}, this.$data.modelDataInit, resp.body, params.row);
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
                        let resp = await this.$http.post('/ces/car/detail/del', {
                          'no': params.row.modelNo
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
