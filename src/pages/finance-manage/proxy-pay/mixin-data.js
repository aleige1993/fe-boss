export default {
  data() {
    return {
      checkboxColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      ],
      defaultColumns: [
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
          width: 160,
          render: (h, params) => {
            let time = this.flag === '0' ? params.row.transEndtime : params.row.gmtModified;
            return h('span', {}, time);
          }
        }
      ],
      endTimeColums: [
        {
          title: '云贷放款日',
          key: 'transEndtime',
          width: 110,
          render: (h, params) => {
            let transEndtime = params.row.transEndtime;
            if (transEndtime) {
              return h('span', {}, transEndtime.substring(0, 10));
            }
          }
        }
      ],
      stateColums: [
        {
          title: '支付流水号',
          key: 'transNo',
          width: 240
        },
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
              return h('span', {}, '失败');
            } else if (params.row.state === '2') {
              return h('span', {}, '已退款');
            } else if (params.row.state === '3') {
              return h('span', {}, '待付款');
            }
          }
        }
      ],
      actionColumns: [
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
