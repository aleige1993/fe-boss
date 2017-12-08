export default {
  data() {
    return {
      carColumns: [
        {
          title: '权利人类型',
          align: 'center',
          width: 100,
          key: 'obligeeType'
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
                    this.setListCar(Object.assgin({}, params.row));
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
      carData: [
        {
          obligeeType: '个人',
          obligeeNo: '65761568',
          obligeeName: '权利人名称',
          carModel: 'CS75',
          carNo: '渝B88888',
          engineNo: 'JAS4WER6ASDW41200152',
          carFrameNo: 'WE5151X89AS1DW684',
          carMoney: '168000'
        }
      ]
    };
  }
};
