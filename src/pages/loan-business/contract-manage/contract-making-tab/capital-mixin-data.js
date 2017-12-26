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
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
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
                    this.loanCapitalSetRow(Object.assign({}, params.row));
                  }
                }
              }, '更改')
            ]);
          }
        }
      ],
      loanCapitalData: [],
      // 资金方还款计划表
      repayPlanCapitalColumns: [
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
      repayPlanCapitalList: [],
      // 租金方还款计划表
      repayPlanRentalColumns: [
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
      repayPlanRentalList: []
    };
  }
};
