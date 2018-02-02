export default {
  data() {
    return {
      columns1: [
        // {
        //   title: '车类',
        //   width: 200,
        //   key: 'bizType',
        //   render: (h, params) => {
        //     return h('span', {}, this.enumCode2Name(params.row.bizType, 'BizTypeEnum'));
        //   }
        // },
        {
          title: '客户等级',
          key: 'custLevel'
        },
        {
          title: '贷款期限(月)',
          key: 'loanPeriods'
        },
        {
          title: '利率模式',
          key: 'interestType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.interestType, 'RateModeEnum'));
          }
        },
        {
          title: '颂车名义利率(%/年)',
          key: 'loanNominalRate'
        },
        {
          title: '颂车实际利率(%/年)',
          key: 'loanRealRate'
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
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
                  click: () => {
                    this.$data.packageRateNo = params.row.packageRateNo;
                    this.getCostCollectList();  // 获取模态框列表数据
                    this.$data.showCostModel = true;
                  }
                }
              }, '费用收取'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.openZF($.extend({}, params.row));
                  }
                }
              }, '资方利率'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setList($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
