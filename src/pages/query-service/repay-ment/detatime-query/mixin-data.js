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
          title: '证件编号',
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
          title: '应还款日',
          key: 'taskArriveTime'
        },
        {
          title: '当前期数',
          key: 'timeConsuming'
        },
        {
          title: '应还本金',
          key: 'timeConsuming'
        },
        {
          title: '应还利息',
          key: 'timeConsuming'
        },
        {
          title: '应付租金',
          key: 'timeConsuming'
        },
        {
          title: '逾期金额',
          key: 'timeConsuming'
        },
        {
          title: '逾期天数',
          key: 'timeConsuming'
        },
        {
          title: '应还总额',
          key: 'timeConsuming'
        },
        {
          title: '还款状态',
          key: 'timeConsuming'
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
