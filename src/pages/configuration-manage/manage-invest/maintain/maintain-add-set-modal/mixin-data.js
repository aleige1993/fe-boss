export default {
  data() {
    return {
      columns1: [
        {
          title: '协议编号',
          width: 200,
          align: 'center',
          key: 'cooperationNo'
        },
        {
          title: '协议名称',
          key: 'cooperationName'
        },
        {
          title: '协议附件',
          key: 'enclosure',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'android-download'
                },
                on: {
                  click: () => {
                    window.open(params.row.attachUrl);
                  }
                }
              }, '点击浏览/下载')
            ]);
          }
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeUpload($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          'id': 'biaohao123',
          'name': '协议名称01',
          'enclosure': '协议附件01'
        }
      ]
    };
  }
};
