export default {
  data() {
    return {
      isAdd: true,
      showAdd: false,
      formInModel: {
        name: '',
        mode: '',
        direction: '',
        standard: '',
        money: ''
      },
      columns1: [
        {
          title: '费用类型ID',
          width: 200,
          key: 'id'
        },
        {
          title: '费用类型名称',
          key: 'name'
        },
        {
          title: '收取方式',
          key: 'mode'
        },
        {
          title: '收支方向',
          key: 'direction'
        },
        {
          title: '利率标准(%)',
          key: 'standard'
        },
        {
          title: '固定金额(元)',
          key: 'money'
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
      data1: []
    };
  }
};
