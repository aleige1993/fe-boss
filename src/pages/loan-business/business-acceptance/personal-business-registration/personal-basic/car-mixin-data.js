export default {
  data() {
    return {
      carColumns: [
        {
          title: '权利人类型',
          align: 'center',
          width: 100,
          key: 'obligeeType',
          render: (h, params) => {
            return h('span', {}, params.row.obligeeType === '1' ? '个人' : '企业');
          }
        },
        {
          title: '权利人编号',
          key: 'obligeeNo'
        },
        {
          title: '权利人名称',
          key: 'obligeeName'
        },
        {
          title: '车辆型号',
          key: 'carModel'
        },
        {
          title: '车牌号',
          width: 100,
          key: 'carNo'
        },
        {
          title: '发动机号',
          key: 'engineNo'
        },
        {
          title: '车架号',
          key: 'carFrameNo'
        },
        {
          title: '车辆价值',
          width: 100,
          key: 'carMoney'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.setListCar(Object.assign({}, params.row));
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeCar($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      carData: []
    };
  }
};
