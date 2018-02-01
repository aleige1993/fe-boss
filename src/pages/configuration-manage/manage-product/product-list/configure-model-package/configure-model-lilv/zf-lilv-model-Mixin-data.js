export default {
  data() {
    return {
      columnsZFLV: [
        {
          title: '资方',
          width: 200,
          key: 'capitalName'
        },
        {
          title: '名义利率(%/年)',
          key: 'nominalRate'
        },
        {
          title: '实际利率(%/年)',
          key: 'realRate'
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
                    this.setListZFLV($.extend({}, params.row));
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
                    this.removeZFLV($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      dataZFLV: [
        {
          'capitalName': 'mockjs',
          'nominalRate|1-10': 1,
          'realRate': '2.5'
        }
      ]
    };
  }
};
