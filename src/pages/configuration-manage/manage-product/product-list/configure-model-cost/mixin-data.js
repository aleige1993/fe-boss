export default {
  data() {
    return {
      columns1: [
        {
          title: '费用类型ID',
          width: 120,
          key: 'feeTypeNo'
        },
        {
          title: '费用类型代码',
          width: 120,
          key: 'feeTypeCode'
        },
        {
          title: '费用类型名称',
          key: 'feeTypeName'
        },
        {
          title: '计算方式',
          key: 'incomeType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.incomeType, 'ReceiveTypeEnum'));
          }
        },
        {
          title: '收支方向',
          key: 'feeType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.feeType, 'FeeTypeEnum'));
          }
        },
        {
          title: '利率标准(%)',
          key: 'ratio'
        },
        {
          title: '固定金额(元)',
          key: 'fixedAmount'
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
