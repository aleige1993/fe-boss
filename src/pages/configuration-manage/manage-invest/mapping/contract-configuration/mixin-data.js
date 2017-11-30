export default {
  data() {
    return {
      columns1: [
        {
          title: '模板ID',
          key: 'templateId'
        },
        {
          title: '合同名称',
          key: 'templateName'
        },
        {
          title: '资方名称',
          key: 'zfName'
        },
        {
          title: '签订方式',
          key: 'signMode'
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
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
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          templateId: '01',
          templateName: '合同名称01',
          zfName: '资方名称01',
          signMode: 1
        }
      ]
    };
  }
};
