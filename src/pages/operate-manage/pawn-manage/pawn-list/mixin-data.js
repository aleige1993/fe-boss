export default {
  data() {
    return {
      pawnColumns: [
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
          title: '回传天数(天)',
          width: 120,
          key: 'backDays'
        },
        {
          title: '剩余回传天数(天)',
          width: 140,
          key: 'surplusBackDays'
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
                on: {
                  click: async() => {
                    // 设置当前处理人
                    /* let rep = await this.$http.post('/biz/payment/settingHandleUserWithPawn', {
                      id: params.row.id
                    });
                    if (!rep.success) {
                      return;
                    }*/
                    this.$router.push({
                      path: '/index/operate/pawn/handle',
                      query: {
                        currentPage: this.$data.currentPage,
                        loanNo: params.row.loanNo,
                        id: params.row.id
                      }
                    });
                  }
                }
              }, '办理')
            ]);
          }
        }
      ],
      pawnData: []
    };
  }
};
