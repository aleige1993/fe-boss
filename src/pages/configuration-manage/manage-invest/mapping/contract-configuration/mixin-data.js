export default {
  data() {
    return {
      columns1: [
        {
          title: '模板ID',
          key: 'contractTemplateNo'
        },
        {
          title: '合同名称',
          key: 'contractTemplateName'
        },
        {
          title: '资方名称',
          key: 'capitalName'
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.openContcartSeting($.extend({}, params.row));
                  }
                }
              }, '查看合同属性')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
