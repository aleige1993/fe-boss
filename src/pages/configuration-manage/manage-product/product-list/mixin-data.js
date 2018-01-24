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
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setList($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: params.row.status !== '3'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
