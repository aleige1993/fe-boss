export default {
  data() {
    return {
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'name'
        },
        {
          title: '附件文件',
          key: 'url'
        },
        {
          title: '操作',
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
              }, '下载'),
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
      companyAttachFiles: [
        {
          name: '仓井空.av',
          url: 'http://www.baidu.com'
        }
      ]
    };
  }
};
