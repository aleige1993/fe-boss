export default {
  data() {
    return {
      currentInfoColumns: [
        {
          title: '项目编号',
          key: 'orderNo'
        },
        {
          title: '项目金额',
          key: 'orderAmt'
        },
        {
          title: '开始时间',
          key: 'startDate'
        },
        {
          title: '结束时间',
          key: 'endDate'
        },
        {
          title: '本金逾期金额',
          key: 'capitalOverdueAmt'
        },
        {
          title: '利息逾期金额',
          key: 'accrualOverdueAmt'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  'click': () => {
                    alert(params.index);
                  }
                }
              }, '详情')
            ]);
          }
        }
      ],
      currentInfoDatas: [],
      thirdPartyProofColumns: [
        {
          title: '项目编号',
          key: 'orderNo'
        },
        {
          title: '担保类型',
          key: 'warrantType'
        },
        {
          title: '纸质抵押物类型',
          key: 'mortgageType'
        },
        {
          title: '纸质抵押物名称',
          key: 'mortgageName'
        },
        {
          title: '最终估价',
          key: 'assessAmt'
        },
        {
          title: '登记日期',
          key: 'regDate'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  'click': () => {
                    alert(params.index);
                  }
                }
              }, '纸质抵押物详情')
            ]);
          }
        }
      ],
      thirdPartyProofDatas: []
    };
  }
};
