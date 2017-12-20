export default {
  data() {
    return {
      // 资金方信息表
      loanCapitalColumns: [
        {
          title: '资方名称',
          width: 170,
          align: 'center',
          key: 'capitalName'
        },
        {
          title: '放款比例（%）',
          key: 'loanRatio'
        },
        {
          title: '账户名',
          key: 'acctName'
        },
        {
          title: '开户行',
          key: 'openBankName'
        },
        {
          title: '账号',
          key: 'acctNo'
        }
      ],
      loanCapitalData: [
        {
          'capitalName': '资方名称01',
          'loanRatio': '50',
          'acctName': '账户名01',
          'openBankName': '中国建设银行',
          'acctNo': '8888888888888'
        }
      ],
      // 租金还款计划表
      rentPlanCapitalColumns: [
        {
          title: '应还款日',
          width: 170,
          align: 'center',
          key: 'repayDate'
        },
        {
          title: '应还本金',
          key: 'repayAmt'
        },
        {
          title: '应付利息',
          key: 'repayRate'
        },
        {
          title: '应还（付）总额',
          key: 'repayTotalAmt'
        }
      ],
      rentPlanCapitalData: [
        {
          'repayDate': '2017-12-25',
          'repayAmt': '10',
          'repayRate': '1',
          'repayTotalAmt': '11'
        },
        {
          'repayDate': '2017-12-25',
          'repayAmt': '20',
          'repayRate': '2',
          'repayTotalAmt': '22'
        }
      ],
      // 租金还款计划表
      capitalPlanCapitalColumns: [
        {
          title: '应还款日',
          width: 170,
          align: 'center',
          key: 'repayDate'
        },
        {
          title: '应还本金',
          key: 'repayAmt'
        },
        {
          title: '应付利息',
          key: 'repayRate'
        },
        {
          title: '应还（付）总额',
          key: 'repayTotalAmt'
        }
      ],
      capitalPlanCapitalData: [
        {
          'repayDate': '2017-12-25',
          'repayAmt': '10',
          'repayRate': '1',
          'repayTotalAmt': '11'
        },
        {
          'repayDate': '2017-12-25',
          'repayAmt': '20',
          'repayRate': '2',
          'repayTotalAmt': '22'
        }
      ],
      // 合同信息表
      contractInfoColumns: [
        {
          title: '文档编号',
          width: 170,
          align: 'center',
          key: 'contractNO'
        },
        {
          title: '合同名称',
          key: 'contractName'
        },
        {
          title: '合同附件',
          key: 'makeContractUrl'
        },
        {
          title: '生成方式',
          key: 'makeSystem'
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
                    alert('点击了预览');
                    // window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '预览'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert('点击了下载');
                    // window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载')
            ]);
          }
        }
      ],
      contractInfoData: [
        {
          'contractNO': '001',
          'contractName': '001',
          'makeContractUrl': '001',
          'makeSystem': '001'
        }
      ]
    };
  }
};
