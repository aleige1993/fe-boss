export default {
  data() {
    return {
      approveHistoryColumns: [
        {
          title: '处理人',
          key: 'name'
        },
        {
          title: '任务节点',
          key: 'name'
        },
        {
          title: '开始时间',
          key: 'name'
        },
        {
          title: '结束时间',
          key: 'name'
        },
        {
          title: '耗时',
          key: 'name'
        },
        {
          title: '结论',
          key: 'name'
        },
        {
          title: '意见信息',
          key: 'name'
        }
      ],
      approveHistoryData: [
        {
          name: '张三'
        }
      ],
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'attachName'
        },
        {
          title: '附件文件',
          key: 'attachUrl'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.companyAttachFiles.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      companyAttachFiles: [
        {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }
      ],
      // 初审信息
      firstApproveColumns: [
        {
          title: '第三方网站名称',
          key: 'attachName'
        },
        {
          title: '查询描述',
          key: 'attachUrl'
        },
        {
          title: '查询结果',
          key: 'attachUrl'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.companyAttachFiles.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      firstApproveData: [
        {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }
      ],
      // 外审信息
      outApproveColumns: [
        {
          title: '尽调材料',
          key: 'attachName'
        },
        {
          title: '描述',
          key: 'attachUrl'
        },
        {
          title: '查询结果',
          key: 'attachUrl'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.companyAttachFiles.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      outApproveData: [
        {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }
      ]
    };
  }
};
