export default {
  data() {
    return {
      currentInfoColumns: [
        {
          title: '项目编号',
          key: 'contactNo'
        },
        {
          title: '项目金额',
          key: 'contactNo'
        },
        {
          title: '开始时间',
          key: 'contactNo'
        },
        {
          title: '结束时间',
          key: 'contactNo'
        },
        {
          title: '最终估价',
          key: 'contactNo'
        },
        {
          title: '本金逾期金额',
          key: 'contactNo'
        },
        {
          title: '利息逾期金额',
          key: 'contactNo'
        },
        {
          title: '状态',
          key: 'contactNo'
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
      currentInfoDatas: [
        {
          contactNo: '1'
        }
      ],
      thirdPartyProofColumns: [
        {
          title: '项目编号',
          key: 'contactNo'
        },
        {
          title: '担保类型',
          key: 'contactNo'
        },
        {
          title: '纸质抵押物类型',
          key: 'contactNo'
        },
        {
          title: '纸质抵押物名称',
          key: 'contactNo'
        },
        {
          title: '最终估价',
          key: 'contactNo'
        },
        {
          title: '登记日期',
          key: 'contactNo'
        },
        {
          title: '状态',
          key: 'contactNo'
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
      thirdPartyProofDatas: [
        {
          contactNo: '1'
        },
        {
          contactNo: '1'
        }
      ]
    };
  }
};
