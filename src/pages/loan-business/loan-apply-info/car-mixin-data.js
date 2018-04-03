export default {
  data() {
    return {
      carColumns: [
        {
          title: '权利人类型',
          align: 'center',
          width: 100,
          key: 'custType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.custType, 'CustTypeEnum'));
          }
        },
        {
          title: '权利人编号',
          width: 120,
          key: 'carOwnerNo'
        },
        {
          title: '权利人名称',
          key: 'carOwnerName'
        },
        {
          title: '车辆型号',
          width: 120,
          key: 'carModelName',
          render: (h, params) => {
            return h('span', {}, params.row.carBrandName + params.row.carTypeName + params.row.carModelName);
          }
        },
        {
          title: '车牌号',
          width: 100,
          key: 'carPlateNo'
        },
        {
          title: '发动机号',
          key: 'carEngineNo'
        },
        {
          title: '车架号',
          key: 'carFrameNo'
        },
        {
          title: '车辆价值',
          width: 100,
          key: 'carEvaluatePrice'
        },
        {
          title: '操作',
          key: 'action',
          width: 260,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$data.carListRowData = params.row;
                    if (!params.row.loanCarPicVOList) {
                      params.row.loanCarPicVOList = [];
                    }
                    this.$data.loanCarPicVOListModalData = $.extend({}, params.row).loanCarPicVOList;
                    this.$data.seeCarPictureModal = true;
                  }
                }
              }, this.readonly ? '查看车辆图片' : '上传/查看车辆图片'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.readonly
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setListCar($.extend(true, {}, params.row));
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.readonly
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
