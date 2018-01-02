export default {
  data() {
    return {
      // 放款条件落实
      conditionListColumns: [
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
          key: 'totalPeriods',
          width: 80
        },
        {
          title: '贷款金额(元)',
          key: 'loanTotalAmt'
        },
        {
          title: '签约完成时间',
          key: 'signConfirmDate',
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
                  click: async () => {
                    // 设置当前处理人
                    let rep = await this.$http.post('/biz/loan/settingHandleUser');
                    if (!rep.success) {
                      return;
                    }
                    this.$router.push({
                      path: '/index/loanbusiness/loan/fee/handle',
                      query: {
                        currentPage: this.$data.currentPage,
                        paymentNo: params.row.paymentNo,
                        loanNo: params.row.loanNo
                      }
                    });
                  }
                }
              }, '办理')
            ]);
          }
        }
      ],
      conditionListData: []
    };
  }
};
