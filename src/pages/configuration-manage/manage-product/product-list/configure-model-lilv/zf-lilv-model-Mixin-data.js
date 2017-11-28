export default {
  data() {
    return {
      columns1: [
        {
          title: '资方',
          width: 200,
          key: 'zf'
        },
        {
          title: '名义利率(%/年)',
          key: 'nominal'
        },
        {
          title: '实际利率(%/年)',
          key: 'actual'
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
                    this.setList(params.row);
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
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          zf: '海尔云贷',
          nominal: 0.15,
          actual: 0.25
        },
        {
          zf: '海乐行',
          nominal: 0.2,
          actual: 0.3
        }
      ]
    };
  }
};
