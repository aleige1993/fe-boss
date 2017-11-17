export default {
  data() {
    return {
      spouseColumns: [
        {
          title: '配偶客户编号',
          key: 'accountName'
        },
        {
          title: '配偶姓名',
          key: 'accountNo'
        },
        {
          title: '学历',
          key: 'bankName'
        },
        {
          title: '证件类型',
          key: 'bankNo'
        },
        {
          title: '证件号码',
          key: 'bankBranchName'
        },
        {
          title: '手机号码',
          key: 'accountNo'
        },
        {
          title: '单位编号',
          key: 'bankName'
        },
        {
          title: '单位名称',
          key: 'bankNo'
        },
        {
          title: '婚姻关系',
          key: 'bankBranchName'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            return h('div', [
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
                    this.show(params.index);
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
                    this.show(params.index);
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
      spouseDatas: [
        {
          accountName: 'Joe Black',
          accountNo: '25645415842142151',
          bankName: '中国工商银行',
          type: '客户',
          bankNo: '2254',
          bankBranchName: '上清寺支行'
        }
      ],
      columns4: [
        {
          title: '客户编号',
          key: 'name'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'name'
        },
        {
          title: '证件类型',
          key: 'name'
        },
        {
          title: '证件号码',
          key: 'name'
        },
        {
          title: '状态',
          key: 'age'
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
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    alert(params.row);
                  }
                }
              }, '选择这个客户')
            ]);
          }
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    };
  }
};
