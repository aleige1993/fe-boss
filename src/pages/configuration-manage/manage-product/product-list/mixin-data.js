export default {
  data() {
    return {
      columns1: [
        {
          title: '产品编号',
          width: 170,
          align: 'center',
          key: 'productNo'
        },
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '产品别名',
          key: 'productAlias'
        },
        {
          title: '产品类型',
          width: 100,
          key: 'productType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.productType, 'ProductTypeEnum'));
          }
        },
        {
          title: '产品状态',
          width: 100,
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'ProductStatusEnum'));
          }
        },
        {
          title: '创建时间',
          key: 'gmtCreate'
        },
        {
          title: '更新时间',
          key: 'gmtModified'
        },
        {
          title: '创建人',
          key: 'createUserCode'
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.type !== 'page'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let maxLimit = params.row.maxLimit;
                    if (params.row.maxLimit) {
                      params.row.maxLimit = maxLimit + '';
                    }
                    this.setList($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Tooltip', {
                props: {
                  disabled: true
                },
                on: {
                  'on-popper-show': () => {
                    if (params.row.status !== '3') {
                      this.$data.tooltipShow = true;
                    }
                  },
                  'on-popper-hide': () => {
                    if (params.row.status !== '3') {
                      this.$data.tooltipShow = false;
                    }
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: params.row.status !== '3' || this.type !== 'page'
                  },
                  on: {
                    click: () => {
                      this.remove($.extend({}, params.row));
                    }
                  }
                }, '删除')
              ])
            ]);
          },
          renderHeader: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  'color': this.$data.tooltipShow ? 'red' : '#495060'
                }
              }, this.$data.tooltipShow ? '产品状态为“初始化状态”时方可删除' : '操作')
            ]);
          }
        }
      ],
      tooltipShow: false,
      data1: []
    };
  }
};
