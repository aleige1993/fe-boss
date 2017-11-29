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
                  }
                }
              }, '详情'),
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
                    this.remove1($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: '协议编号',
          width: 100,
          align: 'center',
          key: 'id'
        },
        {
          title: '协议名称',
          key: 'name'
        },
        {
          title: '协议附件',
          key: 'enclosure'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (this.$data.iSsee) {
              return;
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove2(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data2: []
    };
  }
};
