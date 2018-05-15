export default {
  data() {
    return {
      CustomerColumns: [
        {
          title: '项目编号',
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'memberName'
        },
        {
          title: '证件号码',
          key: 'merchantAbbr'
        },
        {
          title: '客户电话',
          key: 'channelName'
        },
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '放款日期',
          key: 'taskArriveTime'
        },
        {
          title: '期数',
          key: 'timeConsuming'
        },
        {
          title: '贷款金额/元',
          key: 'timeConsuming'
        },
        {
          title: '逾期金额',
          key: 'timeConsuming'
        },
        {
          title: '逾期期数',
          key: 'timeConsuming'
        },
        {
          title: '贷款状态',
          key: 'timeConsuming'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: { },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/query/repay/persondetails/'
                      // path: '/index/query/repay/persondetails/' + params.row.orderNo
                    });
                  }
                }
              }, '查看')
            ]);
          }
        }
      ],
      privateCustomerLoanList: [
        {
          'loanNo': 1,
          'memberName': 1
        }
      ]
    };
  }
};
