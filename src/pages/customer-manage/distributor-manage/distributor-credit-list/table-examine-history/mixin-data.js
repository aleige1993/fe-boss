export default {
  data() {
    return {
      columns1: [
        {
          title: '处理人',
          align: 'center',
          width: 200,
          key: 'auditUserName'
        },
        {
          title: '开始时间',
          key: 'auditStartTime'
        },
        {
          title: '结束时间',
          key: 'auditEndTime'
        },
        {
          title: '耗时',
          width: 140,
          key: 'timeLong'
        },
        {
          title: '结论',
          key: 'auditStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.auditStatus, 'ApproveStatusEnum'));
          }
        },
        {
          title: '意见信息',
          key: 'auditOpinion'
        }
      ],
      data1: []
    };
  }
};
