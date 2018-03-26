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
          width: 300,
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
                    this.$data.tableRowIndex = params.index;
                    this.$data.detailsCarDataShowModal = true;
                    this.$data.clickRow = {};
                    this.$data.clickRow = $.extend({}, params.row);
                    this.$data.detailsCarDataForm = $.extend({}, params.row);
                  }
                }
              }, '查看车辆信息'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.$data.warrantType === ''
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$data.clickRow = params.row;
                    this.$data.tableRowIndex = params.index;
                    // 权证回传方式为《先入库后抵押》则展示办理抵押按钮
                    if (this.$data.warrantType === '2') {
                      this.$data.formalitiesShowModal = true;
                      this.$data.formalities = $.extend(true, {}, this.$data.formalities, params.row);
                      // 转成数组
                      if (!this.$data.formalities.mortgageUrl || !this.$data.formalities.mortgageName) {
                        this.$data.mortgageList = [];
                      } else {
                        this.$data.mortgageList = this.mortgageStrToArray(this.$data.formalities.mortgageUrl, this.$data.formalities.mortgageName);
                        console.log(this.$data.mortgageList);
                      }
                    }
                    // 权证回传方式为《先抵押后入库》则展示办理抵押按钮
                    if (this.$data.warrantType === '1') {
                      this.$data.backDaysShowModal = true;
                      this.$data.backDaysForm = $.extend(true, {}, this.$data.backDaysForm, params.row);
                    }
                  }
                }
              }, this.carBtnWarrantType)
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
                    this.$data.formagGuarantee = {};
                    this.$data.formagGuarantee = params.row;
                  }
                }
              }, '担保落实')
            ]);
          }
        }
      ],
      assureData: [],
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
          key: 'remark',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.remark
              },
              on: {
                'on-blur': (event) => {
                  this.$data.conditionData[params.index].remark = event.target.value;
                }
              }
            });
          }
        },
        {
          title: '落实状态',
          key: 'status',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.status
              },
              on: {
                'on-change': (val) => {
                  this.$data.conditionData[params.index].status = val;
                }
              }
            }, this.enumSelectData.get('LoanLuoShiStatusEnum').map((item) => {
              return h('i-option', {
                props: {
                  label: item.itemName,
                  value: item.itemCode
                }
              });
            }));
          }
        }
      ],
      conditionData: []
    };
  },
  computed: {
    carBtnWarrantType() {
      let btnText = '';
      // 权证回传方式为《先入库后抵押》则展示办理抵押按钮
      if (this.$data.warrantType === '2') {
        btnText = '办理抵押';
      }
      // 权证回传方式为《先抵押后入库》则展示权证回传天数按钮
      if (this.$data.warrantType === '1') {
        btnText = '设置回传天数';
      }
      if (this.$data.warrantType === '') {
        btnText = '获取“权证回传方式”失败';
      }
      return btnText;
    }
  }
};
