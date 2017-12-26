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
                'on-change': (value) => {
                  debugger;
                  let rowData = { ...params.row };
                  rowData.status = value;
                  this.$set(this.$data.approveData.loanApproveRuleDTOS, params.index, rowData);
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
      // 费用收取方案
      feeMethodCol: [
        {
          title: '费用项目代码',
          key: 'feeId'
        },
        {
          title: '费用项目',
          key: 'feeName'
        },
        {
          title: '收取方式',
          key: 'feeTakeType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.feeTakeType, 'ReceiveTypeEnum'));
          }
        },
        {
          title: '计算方式',
          key: 'feeCountType'
        },
        {
          title: '比例%',
          key: 'feePercent'
        },
        {
          title: '固定金额（元）',
          key: 'feeAmt'
        },
        {
          title: '应收金额（元）',
          key: 'feeActualAmt',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'v-model': params.row.feeActualAmt
              },
              on: {
                'input': (value) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.feeActualAmt = value;
                  this.$set(this.$data.approveData.loanApproveFeePlanDTOS, params.index, rowData);
                }
              }
            });
          }
        },
        {
          title: '修改原因',
          key: 'remark',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.remark
              },
              on: {
                'input': (value) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.remark = value;
                  this.$set(this.$data.approveData.loanApproveFeePlanDTOS, params.index, rowData);
                }
              }
            });
          }
        }
      ],
      // 放款条件
      loanPaymentConditionCol: [
        {
          title: '项目',
          key: 'repaymentConName'
        },
        {
          title: '内容',
          key: 'repaymentConContent'
        }
      ],
      approveData: {
        // 贷款准入规则
        'loanApproveRuleDTOS': [
          /* {
            'loanApproveCode': '1',
            'loanApproveName': '1',
            'sysProcessOpinion': '1',
            'status': '1'
          }*/
        ],
        // 初审信息
        'loanApproveFirstDTOS': [
          /* {
            'approveDesc': '',
            'approveWebsite': '',
            'resultPath': '',
            'resultFileName': ''
          }*/
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
          /* {
            'feeId': '',
            'feeAmt': '',
            'feeName': '',
            'feeTakeType': '',
            'feePercent': '',
            'feeActualAmt': '',
            'remark': '111',
            'feeCountType': '222'
          }*/
        ],
        // 审核意见
        'loanApproveDTO': {
          'result': '',
          'opinion': ''
        },
        // 放款账户
        'loanApproveAccountDTOS': [
          {
            'acctFlag': '', // 账号类型标识:1-还款账号;2-放款账号;3-收款账
            'acctName': '', // 账户名
            'acctNo': '', // 账号
            'bankCode': '', // 银行编码
            'bankName': '', // 银行名称
            'openBankName': '' // 开户行
          }
        ],
        // 放款条件
        loanPaymentConditionDTOS: [
          {
            'repaymentConNo': '', // 放款条件编号
            'repaymentConName': '', // 放款条件项目名称
            'repaymentConContent': '', // 放款条件项目内容
            'status': '' // 放款条件是否落实：1是；0-否
          }
        ]
      }
    };
  }
};
