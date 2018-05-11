export default {
  data() {
    return {
      backmoenyColumns: [
        {
          title: '应还款日',
          key: 'loanNo',
          render: (h, params) => {
            let repayDate = params.index >= this.$data.backmoenyList.length - 1 ? '总计' : params.row.repayDate;
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
          title: '逾期金额',
          key: 'channelName'
        },
        {
          title: '应还总额',
          key: 'productName'
        },
        {
          title: '还款状态',
          key: 'taskArriveTime'
        }
      ]
    };
  }
};
