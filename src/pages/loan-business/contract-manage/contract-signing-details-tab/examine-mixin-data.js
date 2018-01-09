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
          key: 'taskName'
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
          width: 100,
          key: 'timeConsuming'
        },
        {
          title: '结论',
          key: 'approveStatus'
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
