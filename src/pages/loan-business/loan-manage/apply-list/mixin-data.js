export default {
  data() {
    return {
      applyListColumns: [
        {
          title: '项目编号',
          key: 'loanNo',
          width: 170
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
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'certNo',
          width: 170
        },
        {
          title: '产品',
          key: 'productName'
        },
        {
          title: '期数',
          key: 'loanPeriods',
          width: 80
        },
        {
          title: '贷款金额(元)',
          key: 'loanAmt'
        },
        {
          title: '申请时间',
          key: 'applyTime',
          width: 110
        },
        {
          title: '签约完成时间',
          key: 'endDate',
          width: 110
        },
        {
          title: '任务送达时间',
          width: 110,
          key: 'taskArriveTime'
        },
        {
          title: '已耗时',
          width: 100,
          key: 'timeConsuming'
        },
        {
          title: '当前环节',
          width: 90,
          key: 'taskNode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum'));
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
                    alert(Object.assign({}, params.row));
                  }
                }
              }, '请款')
            ]);
          }
        }
      ],
      applyListData: [
        {
          'loanNo': '111111',
          'custName': 'mockjs',
          'certType': '1',
          'certNo': '800123456789123456',
          'productName': 'mockjs',
          'loanPeriods': '24',
          'loanAmt': '90000.00',
          'applyTime': '2017-12-24',
          'endDate': '2017-12-30',
          'taskArriveTime': '2017-12-30',
          'timeConsuming': '36:56',
          'taskNode': '1'
        }
      ]
    };
  }
};
