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
          title: '车辆型号',
          key: 'carModelName'
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
            // 只要其GPS安装状态有一条时未安装 则当前行显示未安装
            if (params.row.loanCarGpsList && params.row.loanCarGpsList.length !== 0) {
              let gpsStatus = '';
              let gpslist = params.row.loanCarGpsList;
              for (let item of gpslist) {
                if (item.gpsInstallStatus === '0') {
                  gpsStatus = '0';
                  this.$set(this.$data.carData[params.index], 'gpsInstallStatus', '0');
                  break;
                } else {
                  gpsStatus = '1';
                  this.$set(this.$data.carData[params.index], 'gpsInstallStatus', '1');
                }
              }
              return h('span', {}, this.enumCode2Name(gpsStatus, 'GpsInstallStatusEnum'));
            } else {
              return h('span', {}, this.enumCode2Name(params.row.gpsInstallStatus, 'GpsInstallStatusEnum'));
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 340,
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
                  click: async() => {
                    this.$data.detailsCarDataShowModal = true;
                    this.$data.clickRow = {};
                    this.$data.clickRow = $.extend({}, params.row);
                    this.$data.clickRowIndex = params.index;
                    this.$data.detailsCarDataForm = $.extend({}, params.row);
                    this.$data.detailsCarDataForm.billAmt &&
                    (this.$data.detailsCarDataForm.billAmt = this.$data.detailsCarDataForm.billAmt + '');
                    this.$data.detailsCarDataForm.carBuyPrice &&
                    (this.$data.detailsCarDataForm.carBuyPrice = this.$data.detailsCarDataForm.carBuyPrice + '');
                    this.$data.detailsCarDataForm.carGuidePrice &&
                    (this.$data.detailsCarDataForm.carGuidePrice = this.$data.detailsCarDataForm.carGuidePrice + '');
                    this.$data.detailsCarDataForm.carEvaluatePrice &&
                    (this.$data.detailsCarDataForm.carEvaluatePrice = this.$data.detailsCarDataForm.carEvaluatePrice + '');
                  }
                }
              }, '完善车辆信息'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: async() => {
                    this.$data.GPSinstallShowModal = true;
                    this.$data.clickRow = {};
                    this.$data.clickRow = params.row;
                    this.$data.loanCarGpsList = this.$data.carData[params.index].loanCarGpsList || [];
                  }
                }
              }, 'GPS安装落实')
            ]);
          }
        }
      ],
      carData: [],
      // GPS安装信息
      loanCarGpsDTOColumns: [
        {
          title: 'GPS型号',
          key: 'gpsModel'
        },
        {
          title: 'IMEI',
          key: 'imei'
        },
        {
          title: 'GPS合作商',
          key: 'gpsJoinMerchant'
        },
        {
          title: '安装状态',
          key: 'gpsInstallStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.gpsInstallStatus, 'GpsInstallStatusEnum'));
          }
        },
        {
          title: '办理人',
          key: 'makeUser'
        },
        {
          title: '办理时间',
          key: 'makeDate'
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
                  click: async() => {
                    this.$data.isAddGPS = false;
                    this.$data.GPSShowModal = true;
                    this.$data.formAddGPS = $.extend(true, {}, this.$data.formAddGPS, params.row);
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
                    this.$data.loanCarGpsList.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      loanCarGpsList: []
    };
  }
};
