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
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
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
          width: 150,
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
          width: 120,
          key: 'signStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.signStatus, 'BizStatusEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.statusBool(params.row)
                  // disabled: false
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // 设置当前处理人
                    if (!this.settingHandleUser(params.row)) {
                      return;
                    }
                    this.openMakingModal($.extend({}, params.row));
                  }
                }
              }, this.actionListName())
            ]);
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    statusBool(row) {
      let retBool = false;
      // 合同制作列表时
      if (this.taskNode === '6') {
        retBool = (row.taskNode !== '6' || ((row.signStatus !== '0') && (row.signStatus !== '1')));
      }
      // 合同复核列表时
      if (this.taskNode === '7') {
        retBool = (row.taskNode !== '7' || ((row.signStatus !== '0') && (row.signStatus !== '1')));
      }
      // 合同签署确认列表时
      if (this.taskNode === '8') {
        retBool = (row.taskNode !== '8' || ((row.signStatus !== '0') && (row.signStatus !== '1')));
      }
      return retBool;
    },
    actionListName() {
      if (this.taskNode === '6') {
        return '合同制作';
      }
      if (this.taskNode === '7') {
        return '合同复核';
      }
      if (this.taskNode === '8') {
        return '合同签署确认';
      }
    }
  }
};
