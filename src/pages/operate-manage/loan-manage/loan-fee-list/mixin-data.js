export default {
  data() {
    return {
      feeListColumns: [
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
          title: '产品',
          key: 'productName'
        },
        {
          title: '期数(月)',
          key: 'totalPeriods',
          width: 90
        },
        {
          title: '贷款金额(元)',
          width: 120,
          key: 'loanTotalAmt'
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
          title: '处理状态',
          width: 90,
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'BizStatusEnum'));
          }
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
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: (params.row.status !== '0') && (params.row.status !== '1')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: async() => {
                    // 设置当前处理人
                    /* let rep = await this.$http.post('/biz/payment/settingHandleUser', {
                      paymentNo: params.row.paymentNo
                    });
                    if (!rep.success) {
                      return;
                    }*/
                    this.$router.push({
                      path: '/index/operate/loan/fee/handle',
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
      feeListData: []
    };
  }
};
