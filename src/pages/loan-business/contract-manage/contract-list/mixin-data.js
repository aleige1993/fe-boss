export default {
  data() {
    return {
      columns1: [
        {
          title: '签约编号',
          width: 170,
          align: 'center',
          key: 'signNo'
        },
        {
          title: '项目编号',
          width: 170,
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'custName'
        },
        {
          title: '证件类型',
          width: 90,
          key: 'certType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.legalPersonCerttype, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          width: 180,
          key: 'certNo'
        },
        {
          title: '产品',
          key: 'productName'
        },
        {
          title: '期数',
          width: 70,
          key: 'periods'
        },
        {
          title: '融资金额（元）',
          width: 130,
          key: 'loanAmt'
        },
        {
          title: '任务送达时间',
          width: 110,
          key: 'taskArriveTime'
        },
        {
          title: '已耗时',
          width: 110,
          key: 'timeConsuming'
        },
        {
          title: '当前环节',
          width: 120,
          key: 'taskNode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum'));
          }
        },
        {
          title: '当前状态',
          width: 150,
          key: 'taskStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskStatus, 'SignTaskStatusEnum'));
          }
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.openMakingModal($.extend({}, params.row));
                  }
                }
              }, '合同制作')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
