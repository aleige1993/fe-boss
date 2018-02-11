export default {
  data() {
    return {
      columns1: [
        {
          title: '项目编号',
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'custName'
        },
        {
          title: '产品',
          key: 'productName'
        },
        {
          title: '期数',
          key: 'periods'
        },
        {
          title: '贷款金额（元）',
          key: 'loanAmt'
        },
        {
          title: '任务送达时间',
          key: 'taskArriveTime'
        },
        {
          title: '已耗时',
          key: 'timeConsuming'
        },
        {
          title: '当前环节',
          key: 'taskNode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum'));
          }
        },
        {
          title: '当前状态',
          key: 'signStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.signStatus, 'BizStatusEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
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
                on: {
                  click: () => {
                    // 设置当前处理人
                    if (!this.succeed) {
                      if (!this.settingHandleUser(params.row)) {
                        return;
                      }
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
      // 合同签署确认列表时
      if (this.taskNode === '8' && this.succeed) {
        retBool = (row.taskNode !== '8');
      } else if (this.taskNode === '8') {
        retBool = (row.taskNode !== '8' || ((row.signStatus !== '0') && (row.signStatus !== '1')));
      }
      return retBool;
    },
    actionListName() {
      if (this.taskNode === '6') {
        return '合同制作';
      }
      if (this.taskNode === '8' && this.succeed) {
        return '查看合同';
      } else if (this.taskNode === '8') {
        return '合同签署确认';
      }
    }
  }
};
