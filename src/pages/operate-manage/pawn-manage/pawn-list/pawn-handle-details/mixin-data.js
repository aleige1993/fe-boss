export default {
  data() {
    return {
      // 车辆信息
      carColumns: [
        {
          title: '担保类型',
          key: 'guaranteeType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaranteeType, 'PawnTypeEnum'));
          }
        },
        {
          title: '车辆品牌',
          align: 'center',
          key: 'carBrandName'
        },
        {
          title: '车型名称',
          key: 'carModelName',
          render: (h, params) => {
            return h('span', {}, params.row.carBrandName + params.row.carTypeName + params.row.carModelName);
          }
        },
        {
          title: '车牌号',
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
          title: '抵押状态',
          key: 'mortgageStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.mortgageStatus, 'MortgageStatusEnum'));
          }
        },
        {
          title: 'GPS安装状态',
          key: 'gpsInstallStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.gpsInstallStatus, 'GpsInstallStatusEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
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
                    this.$data.formalitiesShowModal = true;
                    this.$data.clickRow = params.row;
                    this.$data.formalities = $.extend(true, {}, this.$data.formalities, params.row);
                    // 转成数组
                    if (!this.$data.formalities.mortgageUrl || !this.$data.formalities.mortgageName) {
                      this.$data.mortgageList = [];
                    } else {
                      this.$data.mortgageList = this.mortgageStrToArray(this.$data.formalities.mortgageUrl, this.$data.formalities.mortgageName);
                    }
                  }
                }
              }, !this.$data.details ? '办理抵押' : '查看抵押')
            ]);
          }
        }
      ],
      carData: []
    };
  }
};
