export default {
  data() {
    return {
      columns1: [
        {
          title: '放款条件ID',
          width: 170,
          align: 'center',
          key: 'loanRuleNo'
        },
        {
          title: '放款条件名称',
          key: 'loanRule'
        },
        {
          title: '客户类型',
          width: 100,
          key: 'custType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.custType, 'CustTypeEnum'));
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
