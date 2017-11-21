export default {
  data() {
    return {
      columns1: [
        {
          title: '合同模板ID',
          width: 100,
          align: 'center',
          key: 'id'
        },
        {
          title: '合同名称',
          key: 'name'
        },
        {
          title: '合同类型',
          key: 'type'
        },
        {
          title: '模板附件',
          key: 'enclosure'
        },
        {
          title: '签约平台模板ID',
          key: 'SignId'
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
                    this.listIndex = params.index;
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
                    this.remove1(params.index);
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
