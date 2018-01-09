export default {
  data() {
    return {
      customerIntentionOrderListColumns: [
        {
          title: '订单编号',
          key: 'orderNo',
          width: 200
        },
        {
          title: '会员姓名',
          key: 'realName',
          width: 120
        },
        {
          title: '身份证号码',
          key: 'certNo',
          width: 200
        },
        {
          title: '注册手机号',
          width: 120,
          key: 'regMobile'
        },
        {
          title: '车辆型号',
          key: 'modelName',
          width: 200
        },
        {
          title: '车类',
          key: 'seriesName',
          width: 200
        },
        {
          title: '车辆价格',
          key: 'guideAmt',
          width: 200
        },
        {
          title: '渠道商',
          key: 'channelNo',
          width: 200
        },
        {
          title: '申请产品',
          key: 'productName',
          width: 200
        },
        {
          title: '申请期数',
          key: 'period',
          width: 192
        },
        {
          title: '申请金额(元)',
          key: 'quotaAmt',
          width: 192
        },
        {
          title: '下单时间',
          key: 'applyTime',
          width: 192
        },
        {
          title: '来源终端',
          key: 'channelNo',
          width: 192
        },
        {
          title: '状态',
          key: 'orderStatus',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.orderStatus, 'MbOrderStatusEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
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
