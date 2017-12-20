export default {
  data() {
    return {
      columns1: [
        {
          title: '签约编号',
          width: 150,
          align: 'center',
          key: 'contractNo'
        },
        {
          title: '项目编号',
          width: 150,
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'corpName'
        },
        {
          title: '证件类型',
          width: 90,
          key: 'legalPersonCerttype',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.legalPersonCerttype, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          width: 180,
          key: 'legalPersonCertno'
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
          title: '申请金额（元）',
          width: 130,
          key: 'applicationMoney'
        },
        {
          title: '审批金额（元）',
          width: 130,
          key: 'examinationMoney'
        },
        {
          title: '申请时间',
          width: 110,
          key: 'applicationDate'
        },
        {
          title: '签约申请时间',
          width: 110,
          key: 'contractDate'
        },
        {
          title: '已耗时',
          key: 'dateLong'
        },
        {
          title: '任务节点',
          width: 90,
          key: 'taskNode'
        },
        {
          title: '状态',
          width: 80,
          key: 'status'
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
