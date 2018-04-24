export default {
  data() {
    return {
      pawnBasicColumns: [
        {
          title: '项目编号',
          key: 'loanNo'
        },
        {
          title: '客户名称',
          key: 'custName'
        },
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '期数(月)',
          key: 'totalPeriods'
        },
        {
          title: '贷款金额(元)',
          key: 'loanTotalAmt'
        },
        {
          title: '回传截至日期',
          key: 'backDate'
        },
        {
          title: '回传天数(天)',
          key: 'backDays'
        }
      ],
      pawnSurplusBackDaysColumns: [
        {
          title: '剩余回传天数(天)',
          key: 'surplusBackDays'
        }
      ],
      pawnGmtModifiedColumns: [
        {
          title: '权证录入时间',
          key: 'gmtModified'
        }
      ],
      pawnActionColumns: [
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
                  click: () => {
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
                        id: params.row.id,
                        details: this.status !== '0'
                      }
                    });
                  }
                }
              }, this.status === '0' ? '办理' : '查看')
            ]);
          }
        }
      ],
      pawnData: []
    };
  }
};
