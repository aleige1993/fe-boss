export default {
  data() {
    return {
      columns1: [
        {
          title: '车类',
          width: 200,
          key: 'bizType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.bizType, 'BizTypeEnum'));
          }
        },
        {
          title: '贷款期限(月)',
          key: 'loanPeriods'
        },
        {
          title: '利率模式',
          key: 'interestType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.interestType, 'InterestType'));
          }
        },
        {
          title: '名义利率(%/年)',
          key: 'loanNominalRate'
        },
        {
          title: '实际利率(%/年)',
          key: 'loanRealRate'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
