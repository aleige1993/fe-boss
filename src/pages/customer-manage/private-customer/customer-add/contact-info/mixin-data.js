export default {
  data() {
    return {
      contactColumns: [
        {
          title: '联系人姓名',
          key: 'name'
        },
        {
          title: '关系',
          key: 'relationShip'
        },
        {
          title: '手机号码',
          key: 'phone'
        },
        {
          title: '联系人类型',
          key: 'type'
        },
        {
          title: '操作',
          key: 'action',
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
      ],
      contactDatas: [
        {
          name: 'Joe Black',
          relationShip: '情人',
          phone: '15696544221',
          type: '客户'
        }
      ],
      contactBookColumns: [
        {
          title: '联系人姓名',
          key: 'name'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '联系人地址',
          key: 'address'
        },
        {
          title: '联系人备注',
          key: 'mark'
        }
      ],
      contactBookDatas: [
        {
          name: 'Joe Black',
          email: '62652654@qq.com',
          phone: '15696544221',
          address: '阴曹地府128号',
          mark: '黑白无常的小弟'
        }
      ],
      callInColumns: [
        {
          title: '联系人姓名',
          key: 'name'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '通话时间',
          key: 'callDate'
        },
        {
          title: '通话时长',
          key: 'callDuration'
        },
        {
          title: '通话次数',
          key: 'callTimes'
        }
      ],
      callInDatas: [
        {
          name: '张三',
          phone: '110110110',
          callDate: '2017-12-25',
          callDuration: 3000,
          callTimes: 100
        }
      ]
    };
  }
};
