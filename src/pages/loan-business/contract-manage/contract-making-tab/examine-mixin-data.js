export default {
  data() {
    return {
      examineColumns: [
        {
          title: '处理人',
          align: 'center',
          width: 150,
          key: 'name'
        },
        {
          title: '任务节点',
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
          width: 200,
          key: 'conclusion'
        },
        {
          title: '意见信息',
          width: 300,
          key: 'opinion'
        }
      ],
      examineData: []
    };
  }
};
