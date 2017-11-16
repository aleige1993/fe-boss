export default {
  data() {
    return {
      contactTableColume: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '关系',
          key: 'relationShip'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '操作',
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
                    this.show(params.index);
                  }
                }
              }, '编辑'),
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
      ]
    };
  }
};
