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
          key: 'approveWebsite'
        },
        {
          title: '查询描述',
          key: 'approveDesc'
        },
        {
          title: '查询结果',
          key: 'resultPath',
          render: (h, params) => {
            if (Tools.isImg(params.row.resultPath)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  // fullWidth: 500,
                  thumb: params.row.resultPath,
                  full: params.row.resultPath
                }
              });
            } else {
              return params.row.resultFileName;
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
                    window.open(params.row.resultPath, '_blank');
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
                    this.$data.approveData.loanApproveFirstDTOS.splice(params.index, 1);
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
                'on-change': (value) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.feeActualAmt = value;
                  // this.$set(this.$data.approveData.loanApproveFeePlanDTOS, params.index, rowData);
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
          key: 'paymentConName'
        },
        {
          title: '内容',
          key: 'paymentConContent'
        }
      ],
      // 资金方
      loanFundPartyCol: [
        {
          title: '资方名称',
          key: 'acctName' // capitalName
        },
        {
          title: '放款比例（%）',
          key: 'paymentPercent'
        },
        {
          title: '资方借款利率',
          key: 'loanRate'
        },
        {
          title: '账户名',
          key: 'acctName'
        },
        {
          title: '开户银行',
          key: 'openBank'
        },
        {
          title: '账号',
          key: 'acctNo',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.acctNo
              },
              on: {
                'on-blur': (event) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.acctNo = event.target.value;
                  this.$set(this.$data.approveData.loanCapitalDTOS, params.index, rowData);
                }
              }
            });
          }
        }
      ],
      paymentAccountList: [], // 贷款账户下拉
      repaymentAccountList: [], // 还款账户下拉
      loanPeriodsList: [], // 贷款期限下拉菜单
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
            approveDesc: '',
            approveWebsite: '',
            resultPath: '',
            resultFileName: '',
            approveFirstId: ''
          }*/
        ],
        // 用信方案
        'loanApproveCreditDTO': {
          'loanPeriods': '12',
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
          'loanMode': '',
          carSaleAmt: '' // 车辆销售价格
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
        'loanPaymentAccountDTOS': {
          'acctFlag': '', // 账号类型标识:1-还款账号;2-放款账号;3-收款账
          'acctName': '', // 账户名
          'acctNo': '', // 账号
          'bankCode': '', // 银行编码
          'bankName': '', // 银行名称
          'openBankName': '' // 开户行
        },
        // 还款账户
        'loanRePaymentAccountDTOS': {
          'acctFlag': '', // 账号类型标识:1-还款账号;2-放款账号;3-收款账
          'acctName': '', // 账户名
          'acctNo': '', // 账号
          'bankCode': '', // 银行编码
          'bankName': '', // 银行名称
          'openBankName': '' // 开户行
        },
        // 放款条件
        loanPaymentConditionDTOS: [
          {
            'paymentConNo': '', // 放款条件编号
            'paymentConName': '', // 放款条件项目名称
            'paymentConContent': '', // 放款条件项目内容
            'status': '' // 放款条件是否落实：1是；0-否
          }
        ],
        loanCapitalDTOS: [
          /* {
            'capitalNo': '',
            'capitalName': '',
            'loanRate': '',
            'loanRatio': '',
            'acctName': '',
            'acctNo': '',
            'bankCode': '',
            'bankName': '',
            'openBankName': '',
            'openBankNo': '',
            'clearingBankNo': ''
          }*/
        ]
      }
    };
  }
};
