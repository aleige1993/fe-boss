export default {
  data() {
    return {
      columns1: [
        {
          title: '产品编码',
          align: 'center',
          key: 'productNo'
        },
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '适用车类',
          key: 'carType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.carType, 'BizTypeEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                  size: 'small'
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
