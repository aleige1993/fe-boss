export default {
  data() {
    return {
      applyData: {
        // 授信申请公司附件集合
        /* 'creditApplyAttachParamList': [
          /!* {
            'attachUrl': '',
            'attachName': '',
            'attachSuffixType': ''
          }*!/
        ],*/
        // 申请意见入参
        'creditAuditParam': {
          'approveStatus': '',
          'opinion': ''
        },
        // 授信申请信息
        'creditApplyParam': {
          'creditCode': '',
          'corpNo': '',
          'corpName': '',
          'creditLimitApplyNo': null
        }
        // 初审核查列表
        /* 'credityFirstTrialParamList': [
          {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }
        ]*/
      },
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
        /* {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }*/
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
      ]
    };
  }
};
