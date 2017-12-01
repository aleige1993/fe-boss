export default {
  data() {
    return {
      columns1: [
        {
          title: '产品编号',
          width: 100,
          align: 'center',
          key: 'proNumber'
        },
        {
          title: '产品名称',
          key: 'proName'
        },
        {
          title: '资方名称',
          key: 'investName'
        },
        {
          title: '资方产品编号',
          key: 'investProNumber'
        },
        {
          title: '渠道编号',
          key: 'channelNumber'
        },
        {
          title: '客户经理编号',
          key: 'managerNumber'
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
                    this.contractModelOpen($.extend({}, params.row));
                  }
                }
              }, '合同模板'),
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
