import Tools from '../../../../utils/Tools';

export default {
  data() {
    return {
      applyData: {
        // 授信申请公司附件集合
        'creditApplyAttachParamList': [
          /* {
            'attachUrl': '',
            'attachName': '',
            'attachSuffixType': ''
          }*/
        ],
        // 申请意见入参
        'creditAuditParam': {
          'approveStatus': 'A',
          'opinion': ''
        },
        // 授信申请信息
        'creditApplyParam': {
          'creditCode': '',
          'corpNo': '',
          'corpName': '',
          'creditLimitNo': null
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
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'attachName'
        },
        {
          title: '附件文件',
          key: 'attachUrl',
          render: (h, params) => {
            // alert(params.row.attachUrl);
            if (Tools.isImg(params.row.attachUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  fullWidth: 600,
                  thumb: params.row.attachUrl,
                  full: params.row.attachUrl
                }
              });
            } else {
              return params.row.attachUrl;
            }
          }
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
                    this.$data.applyData.creditApplyAttachParamList.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      companyAttachFiles: [
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
        /*{
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
