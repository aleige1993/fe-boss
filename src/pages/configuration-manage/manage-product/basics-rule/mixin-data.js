export default {
  data() {
    return {
      columns1: [
        {
          title: '准入规则ID',
          align: 'center',
          width: 200,
          key: 'approveRuleCode'
        },
        {
          title: '准入规则名称',
          key: 'approveRuleName'
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
