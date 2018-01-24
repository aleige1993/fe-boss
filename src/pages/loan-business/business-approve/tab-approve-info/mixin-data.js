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
          title: '客户类型',
          width: 100,
          key: 'custType',
          render: (h, params) => {
            return this.enumCode2Name(params.row.custType, 'CustTypeEnum');
          }
        },
        {
          title: '初审意见',
          key: 'status',
          render: (h, params) => {
            return h('i-select', {
              props: {
                disabled: this.readonly,
                value: params.row.status
              },
              on: {
                'on-change': (value) => {
                  let rowData = { ...params.row };
                  rowData.status = value;
                  this.$data.approveData.loanApproveRuleDTOS[params.index] = rowData;
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
                  disabled: this.$route.query.status !== '3'
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '计算方式',
          width: 120,
          render: (h, params) => {
            return h('i-select', {
              props: {
                disabled: this.readonly,
                value: '+'
              },
              on: {
                'on-change': (value) => {
                  let rowData = { ...params.row };
                  rowData.calcSign = value;
                  this.$data.approveData.loanApproveFeePlanDTOS[params.index] = rowData;
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '加',
                  value: '+'
                }
              }),
              h('i-option', {
                props: {
                  label: '减',
                  value: '-'
                }
              })
            ]);
          }
        },
        /* {
          title: '费用项目代码',
          key: 'feeTypeCode'
        },*/
        {
          title: '费用项目',
          key: 'feeName'
        },
        {
          title: '收取方式',
          key: 'feeTakeType',
          render: (h, params) => {
            return h('i-select', {
              props: {
                disabled: this.readonly,
                value: params.row.feeTakeType
              },
              style: {
                width: '110px'
              },
              on: {
                'on-change': (value) => {
                  let rowData = { ...params.row };
                  rowData.feeTakeType = value;
                  this.$data.approveData.loanApproveFeePlanDTOS[params.index] = rowData;
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '一次性收取',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '分期收取',
                  value: '2'
                }
              })
            ]);
          }
        },
        /* {
          title: '计算方式',
          key: 'feeCountType'
        },*/
        {
          title: '比例%',
          key: 'feePercent'
        },
        {
          title: '费用金额（元）',
          key: 'feeAmt'
        },
        {
          title: '应收金额（元）',
          key: 'feeActualAmt',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'v-model': params.row.feeActualAmt,
                disabled: this.readonly
              },
              on: {
                'on-blur': (event) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.feeActualAmt = event.target.value;
                  this.$data.approveData.loanApproveFeePlanDTOS[params.index] = rowData;
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
                'value': params.row.remark,
                readonly: this.readonly
              },
              on: {
                'on-blur': (event) => {
                  let rowData = Object.assign({}, params.row);
                  rowData.remark = event.target.value;
                  this.$data.approveData.loanApproveFeePlanDTOS[params.index] = rowData;
                }
              }
            });
          }
        }
      ],
      countFinanceLoading: false,
      countFinanceList: [],
      financingAmt: '',
      // 放款条件
      loanPaymentConditionCol: [
        {
          title: '项目',
          key: 'paymentConName'
        },
        {
          title: '内容',
          key: 'paymentConContent'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.$route.query.status !== '3'
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.approveData.loanPaymentConditionDTOS.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      // 资金方
      loanFundPartyCol: [
        {
          title: '资方名称',
          key: 'capitalName' // capitalName
        },
        {
          title: '放款比例（%）',
          key: 'paymentPercent'
        },
        {
          title: '资方借款利率（%）',
          key: 'loanRate'
        }
      ],
      paymentAccountList: [], // 贷款账户下拉
      repaymentAccountList: [], // 还款账户下拉
      // 贷款期限和利率
      loanPeriodsColumns: [
        {
          title: '车类',
          width: 200,
          key: 'bizType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.bizType, 'BizTypeEnum'));
          }
        },
        {
          title: '贷款期限(月)',
          key: 'loanPeriods'
        },
        {
          title: '利率模式',
          key: 'interestType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.interestType, 'RateModeEnum'));
          }
        },
        {
          title: '名义利率(%/年)',
          key: 'loanNominalRate'
        },
        {
          title: '实际利率(%/年)',
          key: 'loanRealRate'
        }
      ],
      loanPeriodsList: [], // 贷款期限下拉菜单
      approveData: {
        // 贷款准入规则（已经移到申请信息中）
        /* 'loanApproveRuleDTOS': [
           {
            'loanApproveCode': '1',
            'loanApproveName': '1',
            'sysProcessOpinion': '1',
            'status': '1'
          }
        ],*/
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
          // 'loanRealUse': '',
          'operatingMode': '',
          'riskControlContent': '',
          'remark': '',
          'repaymentMode': '',
          'loanMode': '1',
          carSaleAmt: '' // 可融资金额
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
          'result': 'A',
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
