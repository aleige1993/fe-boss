export default {
  data() {
    return {
      examineColumns: [
        {
          title: '处理人',
          align: 'center',
          width: 170,
          key: 'name'
        },
        {
          title: '任务节点',
          width: 120,
          key: 'taskNode'
        },
        {
          title: '开始时间',
          width: 180,
          key: 'timenStart'
        },
        {
          title: '结束时间',
          width: 180,
          key: 'timeEnd'
        },
        {
          title: '耗时',
          width: 100,
          key: 'long'
        },
        {
          title: '结论',
          key: 'conclusion'
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
