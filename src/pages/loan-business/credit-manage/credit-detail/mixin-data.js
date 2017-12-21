export default {
  data() {
    return {
      creditInfo: {
        'firstTrialDTO': {
          'creditCheckItemsList': [
            {
              'itemName': '',
              'fileName': '',
              'description': '',
              'fileUrl': ''
            }
          ],
          'netApprove': '',
          'telephoneApprove': ''
        },
        'creditCode': '',
        'externalAuditDTOList': [
          {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }
        ],
        'creditLimit': {
          'endDate': '',
          'creditLimitReleaseMode': '',
          'startDate': '',
          'totalLimitAmt': ''
        },
        'creditPlanList': [
          {
            'creditLoanReadyList': [
              {
                'readyContent': ''
              }
            ],
            'repayMode': '',
            'isPrepayment': '',
            'prepaymentAccrualMode': '',
            'creditPlanRateList': [
              {
                'payMode': '',
                'periods': '',
                'capitalYearRate': '',
                'scPoundageRate': ''
              }
            ],
            'bailRatio': '',
            'riskControl': '',
            'singleLimitAmt': '',
            'productNo': '',
            'productName': ''
          }
        ],
        'corpNo': '',
        'corpName': '',
        'creditLimitApplyNo': '',
        'creditApplyAttachList': [
          {
            'attachUrl': '',
            'attachName': '',
            'attachSuffixType': ''
          }
        ]
      },
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
          key: 'fileName',
          render: (h, parmas) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  window.open(parmas.row.fileUrl);
                }
              }
            }, parmas.row.fileUrl);
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
                    window.open(params.row.fileUrl, '_blank');
                  }
                }
              }, '下载')
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
          key: 'itemName'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileName',
          render: (h, parmas) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  window.open(parmas.row.fileUrl);
                }
              }
            }, parmas.row.fileUrl);
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
                    window.open(params.row.fileUrl, '_blank');
                  }
                }
              }, '下载')
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
