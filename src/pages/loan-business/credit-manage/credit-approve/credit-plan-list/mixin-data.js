export default {
  data() {
    return {
      planList: [
        /* {
          'creditLoanReadyList': [
            {
              'readyContent': '1'
            }
          ],
          'repayMode': '1',
          'isPrepayment': '1',
          'prepaymentAccrualMode': '1',
          'creditPlanRateList': [
            {
              'payMode': '1',
              'periods': '1',
              'capitalYearRate': '1',
              'scPoundageRate': '1'
            }
          ],
          'bailRatio': '1',
          'riskControl': '1',
          'singleLimitAmt': '1',
          'productNo': '1',
          'productName': '1'
        }*/
      ],
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
