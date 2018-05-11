export default {
  data() {
    return {
      rentmoenyColumns: [
        {
          title: '应付租金日',
          key: 'loanNo',
          render: (h, params) => {
            let repayDate = params.index >= this.$data.rentmoenyList.length - 1 ? '总计' : params.row.repayDate;
            return h('span', {}, repayDate);
          }
        },
        {
          title: '预收租金',
          key: 'memberName'
        },
        {
          title: '应付租金',
          key: 'merchantAbbr'
        },
        {
          title: '逾期金额',
          key: 'channelName'
        },
        {
          title: '应付总额',
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
