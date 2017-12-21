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
          key: 'guaPersonType'
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
          key: 'guaPersonCertType'
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
      // 担保信息表
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
          title: '收取方式',
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
                    alert('点击了预览');
                    // window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '预览'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert('点击了下载');
                    // window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载')
            ]);
          }
        }
      ],
      contractInfoData: []
    };
  }
};
