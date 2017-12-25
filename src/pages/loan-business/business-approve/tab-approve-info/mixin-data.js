import Tools from '../../../../utils/Tools';

export default {
  data() {
    return {
      accessRuleCol: [
        {
          title: '准入规则',
          key: 'loanApproveName'
        },
        {
          title: '系统筛查意见',
          key: 'sysProcessOpinion'
        },
        {
          title: '初审意见',
          key: 'status',
          render: (h, params) => {
            return h('i-select', {
              on: {
                'on-change': (val) => {
                  this.$Message.success(val);
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '符合',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '不符合',
                  value: '2'
                }
              }),
              h('i-option', {
                props: {
                  label: '无法核实',
                  value: '3'
                }
              })
            ]);
          }
        }
      ],
      firstApproveColumns: [
        {
          title: '查询渠道',
          key: 'itemName'
        },
        {
          title: '查询描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileUrl',
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
              return params.row.fileUrl;
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
      feeMethodCol: [
        {
          title: '费用项目',
          key: 'feeProduct'
        },
        {
          title: '收取方式',
          key: 'feeProduct'
        },
        {
          title: '比例%',
          key: 'feeProduct'
        },
        {
          title: '固定金额（元）',
          key: 'feeProduct'
        },
        {
          title: '应收金额（元）',
          key: 'feeProduct'
        },
        {
          title: '备注',
          key: 'feeProduct'
        }
      ],
      approveData: {
        // 贷款准入规则
        'loanApproveRuleDTOS': [
          {
            'loanApproveCode': '1',
            'loanApproveName': '1',
            'sysProcessOpinion': '1',
            'status': '1'
          }
        ],
        // 初审信息
        'loanApproveFirstDTOS': [
          {
            'approveDesc': '',
            'approveWebsite': '',
            'resultPath': '',
            'resultFileName': ''
          }
        ],
        // 用信方案
        'loanApproveCreditDTO': {
          'loanPeriods': '',
          'loanRealRate': '',
          'capitalNo': '',
          'loanNominalRate': '',
          'productName': '',
          'capitalName': '',
          'interestType': '',
          'carInsurance': '',
          'approveLimitAmt': '',
          'dqxInsurance': '',
          'loanApplyUse': '',
          'productNo': '',
          'loanRealUse': '',
          'operatingMode': '',
          'riskControlContent': '',
          'remark': '',
          'repaymentMode': '',
          'loanMode': ''
        },
        // 费用收取方案
        'loanApproveFeePlanDTOS': [
          {
            'feeId': '',
            'feeAmt': '',
            'feeName': '',
            'feeTakeType': '',
            'feePercent': '',
            'feeActualAmt': '',
            'remark': '',
            'feeCountType': ''
          }
        ],
        // 审核意见
        'loanApproveDTO': {
          'result': '',
          'opinion': ''
        },
        // 放款账户
        'loanApproveAccountDTOS': [
          {
            'acctFlag': '',
            'acctName': '',
            'acctNo': '',
            'bankCode': '',
            'bankName': '',
            'openBankName': ''
          }
        ]
      }
    };
  }
};
