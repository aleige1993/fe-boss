export default {
  data() {
    return {
      // 车辆信息表
      carColumns: [
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
          title: '生产厂商',
          key: 'carVendor'
        },
        {
          title: '颜色',
          key: 'carColor',
          render: (h, params) => {
            return this.enumCode2Name(params.row.carColor, 'CarColorEnum');
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
          title: '操作',
          key: 'action',
          width: 120,
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
                    this.$data.setCarDataShowModal = true;
                    this.$data.clickRowIndex = params.index;
                    this.$data.setCarDataForm = $.extend({}, params.row);
                    this.$data.setCarDataForm.billAmt &&
                    (this.$data.setCarDataForm.billAmt = this.$data.setCarDataForm.billAmt + '');
                    this.$data.setCarDataForm.carBuyPrice &&
                    (this.$data.setCarDataForm.carBuyPrice = this.$data.setCarDataForm.carBuyPrice + '');
                    this.$data.setCarDataForm.carGuidePrice &&
                    (this.$data.setCarDataForm.carGuidePrice = this.$data.setCarDataForm.carGuidePrice + '');
                    this.$data.setCarDataForm.carEvaluatePrice &&
                    (this.$data.setCarDataForm.carEvaluatePrice = this.$data.setCarDataForm.carEvaluatePrice + '');
                  }
                }
              }, '完善车辆信息')
            ]);
          }
        }
      ],
      carData: [],
      // 担保信息表
      guaPersonColumns: [
        {
          title: '保证人类型',
          align: 'center',
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
          title: '联系地址',
          key: 'guaPersonAddr'
        }
      ],
      guaPersonData: [],
      // 费用收取表
      feeTakeColumns: [
        {
          title: '费用项目代码',
          align: 'center',
          key: 'feeTypeCode'
        },
        {
          title: '费用项目',
          key: 'feeName'
        },
        {
          title: '收取方式',
          key: 'feeTakeType',
          render: (h, params) => {
            return this.enumCode2Name(params.row.feeTakeType, 'ServiceFeeTypeEnum');
          }
        },
        {
          title: '应收金额（元）',
          key: 'feeActualAmt'
        }
      ],
      feeTakeData: [],
      // 合同信息表
      contractInfoColumns: [
        {
          title: '文档编号',
          align: 'center',
          key: 'contractNo'
        },
        {
          title: '合同名称',
          key: 'contractName',
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                'content': '点击浏览/下载',
                'placement': 'bottom'
              }
            }, [
              h('a', {
                on: {
                  click: () => {
                    window.open(params.row.makeContractUrl, '_blank');
                  }
                }
              }, params.row.contractName)
            ]);
          }
        },
        {
          title: '生成方式',
          key: 'makeSystem',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.makeSystem, 'MakeSystemEnum'));
          }
        },
        {
          title: '操作',
          align: 'center',
          // width: '120',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                // style: {
                //   marginRight: '5px'
                // },
                on: {
                  click: () => {
                    window.open(params.row.makeContractUrl, '_blank');
                  }
                }
              }, '预览 / 下载')
            ]);
          }
        }
      ]
    };
  }
};
