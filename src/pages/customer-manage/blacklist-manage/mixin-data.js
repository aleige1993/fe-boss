export default {
  data() {
    return {
      columns4: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '身份证号',
          key: 'name'
        },
        {
          title: '原因',
          key: 'name'
        },
        {
          title: '来源',
          key: 'name'
        },
        {
          title: '开始时间',
          key: 'name'
        },
        {
          title: '结束时间',
          key: 'age'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/customer/modify',
                      query: {
                        id: params.row.id,
                        from: 'detail'
                      }
                    });
                    // this.remove(params.index);
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: { marginRight: '5px' },
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
          id: 1,
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          id: 2,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          id: 3,
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          id: 4,
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    };
  }
};
