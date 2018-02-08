export default {
  data() {
    return {
      customerIntentionOrderListColumns: [
        {
          title: '订单编号',
          key: 'orderNo'
        },
        {
          title: '会员姓名',
          key: 'realName'
        },
        /* {
          title: '身份证号码',
          key: 'certNo'
        },
        {
          title: '注册手机号',
          key: 'regMobile'
        },*/
        {
          title: '车类',
          key: 'seriesName'
        },
        {
          title: '车辆型号',
          key: 'modelName'
        },
        {
          title: '车辆价格',
          key: 'guideAmt'
        },
        {
          title: '渠道商',
          key: 'dealerName'
        },
        {
          title: '申请产品',
          key: 'productName'
        },
        {
          title: '申请期数',
          key: 'period'
        },
        {
          title: '申请金额(元)',
          key: 'quotaAmt'
        },
        {
          title: '下单时间',
          key: 'applyTime'
        },
        {
          title: '来源终端',
          key: 'channelNo',
          render: (h, params) => {
            return this.enumCode2Name(params.row.channelNo, 'BizChannelEnum');
          }
        },
        {
          title: '状态',
          key: 'orderStatus',
          width: 120,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.orderStatus, 'MbOrderStatusEnum'));
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
                  type: 'success',
                  size: 'small'
                },
                style: { },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/loanbusiness/intentionorder/' + params.row.orderNo
                    });
                  }
                }
              }, '详情')
            ]);
          }
        }
      ],
      customerIntentionOrderList: []
    };
  }
};
