export default {
  data() {
    return {
      loadingAttachFile: false,
      submitApplyLoading: false,
      approveData: {
        // 初审信息
        firstTrialParam: {
          'netApprove': 'aaaaaa',
          'telephoneApprove': '',
          'creditCheckItemsList': [
            /*{
              'itemName': '',
              'fileName': '',
              'description': '',
              'fileUrl': ''
            }*/
          ]
        },
        // 外审信息
        'creditCheckItemsList': [
          /*{
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }*/
        ],
        // 申请意见入参 -- 每个阶段的审核都有
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
        },
        // 最终审批
        'creditPlanParam': {
          'currentLimitAmt': '',
          'totalLimitAmt': '',
          'startDate': 'yyyy-MM-dd',
          'singleLimitAmt': '',
          'creditLimitReleaseMode': '',
          'endDate': 'yyyy-MM-dd'
        }
      },
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
              }, '下载')
            ]);
          }
        }
      ],
      companyAttachFiles: [
        /*{
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }*/
      ],
      // 初审信息
      firstApproveColumns: [
        {
          title: '第三方网站名称',
          key: 'itemName'
        },
        {
          title: '查询描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileUrl'
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
                    window.open(params.row.fileUrl, '_blank');
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.creditStatus !== '3'
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.approveData.firstTrialParam.creditCheckItemsList.splice(params.index, 1);
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
          key: 'itemName'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileUrl'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.creditStatus !== '4'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    window.open(params.row.fileUrl, '_blank');
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
                    this.$data.approveData.creditCheckItemsList.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      outApproveData: [
        /*{
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }*/
      ]
    };
  }
};
