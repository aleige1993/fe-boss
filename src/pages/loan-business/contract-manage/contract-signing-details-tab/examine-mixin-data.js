export default {
  data() {
    return {
      examineColumns: [
        {
          title: '处理人',
          align: 'center',
          width: 170,
          key: 'handleUserName'
        },
        {
          title: '任务节点',
          width: 120,
          key: 'taskName',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskName, 'LoanBizNodeEnum'));
          }
        },
        {
          title: '开始时间',
          width: 180,
          key: 'startTime'
        },
        {
          title: '结束时间',
          width: 180,
          key: 'endTime'
        },
        {
          title: '耗时',
          width: 140,
          key: 'timeConsuming'
        },
        {
          title: '结论',
          key: 'approveStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.approveStatus, 'ApproveStatusEnum'));
          }
        },
        {
          title: '意见信息',
          key: 'opinion'
        }
      ],
      examineData: []
    };
  }
};
