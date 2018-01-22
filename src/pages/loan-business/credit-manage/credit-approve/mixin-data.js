import Tools from '../../../../utils/Tools';

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
            /* {
              'itemName': '',
              'fileName': '',
              'description': '',
              'fileUrl': ''
            }*/
          ]
        },
        // 外审信息
        'creditCheckItemsList': [
          /* {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }*/
        ],
        // 申请意见入参 -- 每个阶段的审核都有
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
        },
        // 最终审批
        'creditLimitParam': {
          // 'currentLimitAmt': '',
          'totalLimitAmt': '',
          'startDate': 'yyyy-MM-dd',
          // 'singleLimitAmt': '',
          'creditLimitReleaseMode': '',
          'endDate': 'yyyy-MM-dd'
        },
        // 用信方案
        'creditPlanList': [
          {
            'productNo': '1',
            'productName': '1',
            'singleLimitAmt': '1',
            'repayMode': '1',
            'isPrepayment': '1',
            'prepaymentAccrualMode': '1',
            'bailRatio': '1',
            'riskControl': '1',
            'creditPlanRateList': [
              {
                'periods': '1',
                'capitalYearRate': '1',
                'scPoundageRate': '1',
                'payMode': '1'
              }
            ],
            'creditLoanReadyList': [
              {
                'readyContent': '1'
              }
            ]
          }
        ]
      },
      // 初审信息
      firstApproveColumns: [
        {
          title: '审查渠道',
          key: 'itemName'
        },
        {
          title: '意见描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileName',
          render: (h, params) => {
            if (Tools.isImg(params.row.fileUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  // fullWidth: 500,
                  thumb: params.row.fileUrl,
                  full: params.row.fileUrl
                }
              });
            } else {
              return params.row.fileName;
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
        /* {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }*/
      ],
      // 外审信息
      outApproveColumns: [
        {
          title: '尽调报告名称',
          key: 'itemName'
        },
        {
          title: '意见描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileUrl',
          render: (h, params) => {
            if (Tools.isImg(params.row.fileUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 100,
                  thumbHeight: 100,
                  // fullWidth: 500,
                  thumb: params.row.fileUrl,
                  full: params.row.fileUrl
                }
              });
            } else {
              return params.row.fileName;
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
                  disabled: this.creditStatus !== '5' && this.creditStatus !== '6'
                },
                on: {
                  click: () => {
                    this.$data.approveData.creditCheckItemsList.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      outApproveData: [
        /* {
          attachName: '仓井空.av',
          attachUrl: 'http://www.baidu.com'
        }*/
      ],
      // 用信方案
      creditPlanColumns: [
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '单笔额度上限',
          key: 'singleLimitAmt'
        },
        {
          title: '还款方式',
          key: 'repayMode'
        },
        {
          title: '是否可提前还款',
          key: 'isPrepayment'
        },
        {
          title: '风控措施',
          key: 'riskControl'
        },
        {
          title: '保证金比例%',
          key: 'bailRatio'
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
                    this.$data.creditPlanFormDetail = true;
                    this.$data.creditPlanFormEdit = false;
                    this.$data.addCreditPlamModal = true;
                    this.$data.creditPlanFormInitData = $.extend({}, params.row);
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  disabled: this.creditStatus !== '5' && this.creditStatus !== '6'
                },
                on: {
                  click: () => {
                    this.$data.creditPlanFormDetail = false;
                    this.$data.creditPlanFormEdit = true;
                    this.$data.creditPlanEditIndex = params.index;
                    this.$data.addCreditPlamModal = true;
                    this.$data.creditPlanFormInitData = $.extend({}, params.row);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.creditStatus !== '5' && this.creditStatus !== '6'
                },
                on: {
                  click: () => {
                    // console.log(params);
                    Alertify.confirm('确定要删除当前用信方案吗？', ok => {
                      if (ok) {
                        this.$data.approveData.creditPlanList.splice(params.index, 1);
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  }
};
