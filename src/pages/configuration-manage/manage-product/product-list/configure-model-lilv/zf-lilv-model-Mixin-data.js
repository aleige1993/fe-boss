export default {
  data() {
    return {
      columns1: [
        {
          title: '资方',
          width: 200,
          key: 'fund'
        },
        {
          title: '名义利率(%/年)',
          key: 'nominalRate'
        },
        {
          title: '实际利率(%/年)',
          key: 'realRate'
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
      data1: [
        {
          fund: 'mockjs',
          nominalRate: '3',
          realRate: '2.5'
        }
      ]
    };
  }
};
