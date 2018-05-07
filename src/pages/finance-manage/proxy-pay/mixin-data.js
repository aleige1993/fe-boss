import BsTooltip from '@/components/bs-tooltip';
export default {
  components: {
    BsTooltip
  },
  data() {
    return {
      customerCheckboxColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      ],
      customerColumns: [
        {
          title: '项目编号',
          key: 'projectNo',
          width: 140
        },
        {
          title: '产品名称',
          key: 'productName',
          width: 140
        },
        {
          title: '客户名称',
          key: 'custName',
          width: 140
        },
        {
          title: '代付金额',
          key: 'transMoney',
          width: 120
        },
        {
          title: '创建时间',
          key: 'gmtCreate',
          width: 160
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
          key: 'toBankName',
          width: 180
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
          title: '收款人开户行机构名',
          key: 'toAccDept',
          width: 180
        },
        {
          title: '收款人身份证号',
          key: 'transCardId',
          width: 170
        },
        {
          title: '银行卡预留手机号',
          key: 'transMobile',
          width: 140
        },
        {
          title: '付款发起时间',
          key: 'actualTime',
          width: 160
        },
        {
          title: '付款完成时间',
          key: 'transEndtime',
          width: 160
        },
        {
          title: '支付流水号',
          key: 'transNo',
          width: 240
        },
        // {
        //   title: '支付渠道',
        //   key: 'flag',
        //   width: 80,
        //   fixed: 'right',
        //   align: 'center',
        //   render: (h, params) => {
        //     return params.row.flag === '0' ? '宝付' : '云贷';
        //   }
        // },
        {
          title: '付款状态',
          key: 'state',
          width: 100,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            if (params.row.state === '0') {
              return h('span', {}, '付款中');
            } else if (params.row.state === '1') {
              return h('span', {}, '成功');
            } else if (params.row.state === '-1') {
              // return h(BsTooltip, {
              //   props: {
              //     showText: '失败',
              //     tipText: `失败原因：${params.row.transRemark}`,
              //     placement: params.index <= 1 ? 'bottom-start' : 'top-start',
              //     // width: '100',
              //     wordBreak: 'break-all',
              //     whiteSpace: 'normal'
              //   }
              // });
              return h('span', {}, '失败');
            } else if (params.row.state === '2') {
              return h('span', {}, '已退款');
            } else if (params.row.state === '3') {
              return h('span', {}, '待付款');
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
            if ((params.row.state === '-1' || params.row.state === '3') && params.row.flag === '0') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  // style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      Alertify.confirm('是否确认付款', ok => {
                        if (ok) {
                          this.submit(params.row.payForNo.split(','));
                        }
                      });
                    }
                  }
                }, '付款')
              ]);
            }
          }
        }
      ],
      remarkColumns: [
        {
          title: '备注',
          key: 'transRemark',
          width: 120,
          fixed: 'right'
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
