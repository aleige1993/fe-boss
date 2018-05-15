export default {
  data() {
    return {
      paymentmoenyColumns: [
        {
          title: '应还款日',
          key: 'loanNo',
          render: (h, params) => {
            let repayDate = params.index >= this.$data.paymentmoenyList.length - 1 ? '总计' : params.row.repayDate;
            return h('span', {}, repayDate);
          }
        },
        {
          title: '应还本金',
          key: 'memberName'
        },
        {
          title: '应还利息',
          key: 'merchantAbbr'
        },
        {
          title: '应付租金',
          key: 'channelName'
        },
        {
          title: '逾期金额',
          key: 'productName'
        },
        {
          title: '应还总额',
          key: 'taskArriveTime'
        },
        {
          title: '还款状态',
          key: 'timeConsuming'
        }
      ]
    };
  }
};
