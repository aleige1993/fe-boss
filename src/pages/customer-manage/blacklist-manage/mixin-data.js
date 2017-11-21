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
          key: 'certNo'
        },
        {
          title: '原因',
          key: 'blacklistReason'
        },
        {
          title: '来源',
          key: 'blacklistReason'
        },
        {
          title: '开始时间',
          key: 'blacklistTime'
        },
        {
          title: '结束时间',
          key: 'gmtModified'
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
      blacklistData: []
    };
  }
};
