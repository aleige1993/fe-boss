export default {
  data() {
    return {
      // 车辆信息表
      carColumns: [
        {
          title: '车辆品牌',
          width: 170,
          align: 'center',
          key: 'carBrandName'
        },
        {
          title: '车辆型号',
          key: 'carModel'
        },
        {
          title: '生产厂商',
          key: 'carVendor'
        },
        {
          title: '颜色',
          key: 'carColor'
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
        }
      ],
      carData: [],
      // 担保信息表
      guaPersonColumns: [
        {
          title: '保证人类型',
          width: 170,
          align: 'center',
          key: 'guaPersonType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonType, 'MemberTypeEnum'));
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
          width: 120,
          key: 'guaPersonCertType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonCertType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          width: 180,
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
          width: 170,
          align: 'center',
          key: 'feeTypeCode'
        },
        {
          title: '费用项目',
          key: 'feeName'
        },
        {
          title: '计算方式',
          key: 'feeTakeType'
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
          width: 170,
          align: 'center',
          key: 'contractNo'
        },
        {
          title: '合同名称',
          key: 'contractName'
        },
        {
          title: '合同附件',
          key: 'makeContractUrl'
        },
        {
          title: '生成方式',
          key: 'makeSystem'
        },
        {
          title: '操作',
          align: 'center',
          width: '120',
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
                    window.open(params.row.makeContractUrl, '_blank');
                  }
                }
              }, '预览 / 下载')
            ]);
          }
        }
      ],
      contractInfoData: []
    };
  }
};
