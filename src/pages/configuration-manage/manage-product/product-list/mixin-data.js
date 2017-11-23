export default {
  data() {
    return {
      columns1: [
        {
          title: '产品编号',
          width: 100,
          align: 'center',
          key: 'proNumber'
        },
        {
          title: '产品名称',
          key: 'proName'
        },
        {
          title: '产品类型',
          key: 'ProductTypeEnum',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.ProductTypeEnum, 'ProductTypeEnum'));
          }
        },
        {
          title: '产品状态',
          key: 'ProductStatusEnum',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.ProductStatusEnum, 'ProductStatusEnum'));
          }
        },
        {
          title: '创建时间',
          key: 'creationTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '创建人',
          key: 'Founder'
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
  },
  methods: {
    // 获取当前时间
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = '-';
      let seperator2 = ':';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
      return currentdate;
    }
  }
};
