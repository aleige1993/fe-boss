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
          key: 'carModel'
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
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: async() => {
                    this.$data.detailsCarDataShowModal = true;
                    this.$data.detailsCarDataForm = $.extend({}, params.row);
                  }
                }
              }, '查看车辆信息'),
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
                    this.$data.formalities = params.row;
                  }
                }
              }, '抵押详情'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: async() => {
                    this.$data.GPSinstallShowModal = true;
                    this.$data.clickRow = await params.row;
                    this.$data.loanCarGpsDTOList = this.$data.carData[params.index].loanCarGpsDTOList;
                  }
                }
              }, 'GPS安装详情')
            ]);
          }
        }
      ],
      carData: [],
      // 担保信息
      assureColumns: [
        {
          title: '保证人类型',
          align: 'center',
          width: 100,
          key: 'guaPersonType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonType, 'CustTypeEnum'));
          }
        },
        {
          title: '保证人编号',
          key: 'guaPersonNo'
        },
        {
          title: '保证人',
          key: 'guaPersonName'
        },
        {
          title: '证件类型',
          key: 'guaPersonCertType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonCertType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'guaPersonCertNo'
        },
        {
          title: '联系电话',
          key: 'guaPersonMobile'
        },
        {
          title: '落实状态',
          key: 'lsStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.lsStatus, 'LoanLuoShiStatusEnum'));
          }
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
                on: {
                  click: () => {
                    this.$data.guaranteeShowModal = true;
                    this.$data.formagGuarantee = params.row;
                  }
                }
              }, '担保详情')
            ]);
          }
        }
      ],
      assureData: [],
      // 费用收取落实
      feeColumns: [
        {
          title: '费用项目',
          align: 'center',
          width: 200,
          key: 'feeName'
        },
        {
          title: '计算方式',
          width: 200,
          key: 'feeTakeType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.feeTakeType, 'ReceiveTypeEnum'));
          }
        },
        {
          title: '比例%',
          key: 'feePercent'
        },
        {
          title: '固定金额（元）',
          key: 'feeAmt'
        },
        {
          title: '应收金额（元）',
          key: 'feeActualAmt'
        },
        {
          title: '是否挂账',
          key: 'isHang',
          width: 200,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.isHang, 'YesNoEnum'));
          }
        },
        {
          title: '已收金额(元)',
          key: 'alreadyReceivAmt'
        },
        {
          title: '收取方式',
          key: 'receivMode',
          width: 200,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.receivMode, 'ReceivModeEnum'));
          }
        },
        {
          title: '是否结清',
          key: 'isClearing',
          width: 200,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.isClearing, 'YesNoEnum'));
          }
        }
      ],
      feeData: [],
      // 放款条件
      conditionColumns: [
        {
          title: '项目',
          align: 'center',
          width: 200,
          key: 'paymentConName'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '落实状态',
          key: 'status',
          width: 200,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'LoanLuoShiStatusEnum'));
          }
        }
      ],
      conditionData: [],
      // GPS安装信息
      loanCarGpsDTOColumns: [
        {
          title: 'GPS型号',
          width: 150,
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
          width: 100,
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
          width: 200,
          key: 'makeDate'
        }
      ],
      loanCarGpsDTOList: []
    };
  }
};
