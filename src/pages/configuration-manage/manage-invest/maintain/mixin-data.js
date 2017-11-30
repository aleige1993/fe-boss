export default {
  data() {
    return {
      columns1: [
        {
          title: '资方编号',
          width: 100,
          align: 'center',
          key: 'id'
        },
        {
          title: '资方名称',
          key: 'name'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
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
                    this.setListZf($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.removeZf($.extend({}, params.row));
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showUser($.extend({}, params.row));
                  }
                }
              }, '账户信息')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
