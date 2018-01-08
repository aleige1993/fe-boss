export default {
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
          key: 'payForNo',
          width: 140
        },
        {
          title: '支付流水号',
          key: 'transNo',
          width: 140
        },
        {
          title: '代付金额',
          key: 'transMoney',
          width: 120
        },
        {
          title: '收款人姓名',
          width: 120,
          key: 'toAccName'
        },
        {
          title: '收款人账号',
          key: 'toAccNo',
          width: 200
        },
        {
          title: '收款人开户银行',
          key: 'toAccDept',
          width: 140
        },
        {
          title: '收款人开户行省名',
          key: 'toProName',
          width: 140
        },
        {
          title: '收款人开户行市名',
          key: 'toCityName',
          width: 140
        },
        {
          title: '收款人身份证号',
          key: 'transCardId',
          width: 200
        },
        {
          title: '银行卡预留手机号',
          key: 'transMobile',
          width: 120
        },
        {
          title: '预计付款时间',
          key: 'expectTime',
          width: 120
        },
        {
          title: '实际付款时间',
          key: 'actualTime',
          width: 120
        },
        {
          title: '付款状态',
          key: 'state',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            if (params.row.state === '0') {
              return '付款中';
            } else if (params.row.state === '1') {
              return '成功';
            } else if (params.row.state === '-1') {
              return h('Tooltip', {
                props: {
                  content: `失败原因：${params.row.transRemark}`
                }
              }, '失败');
            } else if (params.row.state === '2') {
              return '已退款';
            } else if (params.row.state === '3') {
              return '待付款';
            }
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
            if (params.row.state === '-1' || params.row.state === '3') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  // style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.paymentId = params.row.payForNo.split(',');
                      this.payment();
                    }
                  }
                }, '付款')
              ]);
            }
          }
        }
      ],
      privateCustomerLoanList: []
    };
  }
};