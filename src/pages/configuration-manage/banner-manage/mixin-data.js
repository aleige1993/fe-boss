export default {
  data() {
    return {
      customerColumns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '外部URL',
          key: 'linkUrl'
        },
        {
          title: '图片展示',
          key: 'bannerUrl',
          render: (h, params) => {
            return h('img', {
              attrs: {
                style: 'height:60px; margin:10px 0',
                src: params.row.bannerUrl
              }
            });
          }
        },
        {
          title: '是否激活',
          key: 'activeStatus',
          render: (h, params) => {
            if (params.row.activeStatus) {
              return '是';
            } else {
              return '否';
            }
          }
        },
        {
          title: '排序',
          key: 'index'
        },
        {
          title: '操作时间',
          key: 'gmtModified'
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 160,
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

                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                // style: { marginRight: '5px' },
                on: {
                  click: () => {

                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
