export default {
  data() {
    return {
      selectProductModal: false,
      addCreditPlanRateModal: false,
      addCreditLoanReadyModal: false,
      'creditPlan': {
        'productNo': '',
        'productName': '',
        'singleLimitAmt': '',
        'repayMode': '',
        'isPrepayment': '',
        'prepaymentAccrualMode': '',
        'bailRatio': '',
        'riskControl': '',
        'creditPlanRateList': [
          /* {
            'periods': '12',
            'capitalYearRate': '12',
            'scPoundageRate': '12',
            'payMode': '1'
          }*/
        ],
        'creditLoanReadyList': [
          /* {
            'readyContent': ''
          }*/
        ]
      },
      creditPlanRateCol: [
        {
          title: '期限',
          key: 'periods'
        },
        {
          title: '资金方收取年利率%',
          key: 'capitalYearRate'
        },
        {
          title: '颂车收取手续费率%',
          key: 'scPoundageRate'
        },
        {
          title: '收款方式',
          key: 'payMode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.payMode, 'ReceiveTypeEnum'));
          }
        }
      ],
      creditLoanReadyCol: [
        {
          title: '序号',
          width: 100,
          align: 'center',
          type: 'index'
        },
        {
          title: '内容',
          align: 'center',
          key: 'readyContent'
        }
      ]
    };
  }
};
