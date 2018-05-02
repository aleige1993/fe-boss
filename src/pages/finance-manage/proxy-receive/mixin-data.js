import BsTooltip from '@/components/bs-tooltip';
export default {
  components: {
    BsTooltip
  },
  data() {
    return {
      customerColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '项目编号',
          key: 'projectNo',
          width: 140
        },
        {
          title: '支付流水号',
          key: 'transId',
          width: 240
        },
        {
          title: '产品名称',
          key: 'receiveProduct',
          width: 160
        },
        {
          title: '代扣金额',
          key: 'txnAmt',
          width: 120
        },
        {
          title: '扣款人姓名',
          width: 120,
          key: 'idHolder'
        },
        {
          title: '扣款人账号',
          key: 'accNo',
          width: 200
        },
        {
          title: '扣款人开户银行',
          key: 'bankName',
          width: 140
        },
        {
          title: '扣款人身份证号',
          key: 'idCard',
          width: 200
        },
        {
          title: '银行卡预留手机号',
          key: 'mobile',
          width: 140
        },
        {
          title: '扣款发起时间',
          key: 'receiveTime',
          width: 160
        },
        {
          title: '扣款完成时间',
          key: 'succTime',
          width: 160
        },
        {
          title: '扣款成功金额',
          key: 'succAmt',
          width: 120
        },
        {
          title: '扣款状态',
          key: 'orderStat',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            let msg = '';
            if (params.row.orderStat === 'S') {
              return h('span', {}, '成功');
            } else if (params.row.orderStat === 'F') {
              return h(BsTooltip, {
                props: {
                  showText: '失败',
                  tipText: `失败原因：${params.row.reqReserved}`,
                  placement: params.index <= 1 ? 'bottom-start' : 'top-start',
                  // width: '100',
                  wordBreak: 'break-all',
                  whiteSpace: 'normal'
                }
              });
            } else if (params.row.orderStat === 'I') {
              return h('span', {}, '扣款中');
            } else if (params.row.orderStat === 'D') {
              return h('span', {}, '待扣款');
            }
            return h('span', {}, msg);
          }
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 80,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            if (params.row.orderStat === 'F' || params.row.orderStat === 'D') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  // style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      Alertify.confirm('是否确认扣款', ok => {
                        if (ok) {
                          this.submit(params.row.receiveNo.toString().split(','));
                        }
                      });
                    }
                  }
                }, '扣款')
              ]);
            }
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
