export default {
  data() {
    return {
      // 车辆信息
      carColumns: [
        {
          title: '车辆品牌',
          align: 'center',
          key: 'carBrandName'
        },
        {
          title: '车辆型号',
          width: 120,
          key: 'carModel'
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
          title: '是否抵押',
          width: 90,
          align: 'center',
          key: 'isMortgage',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.isMortgage, 'YesNoEnum'));
          }
        },
        {
          title: '是否安装GPS',
          width: 110,
          key: 'isGPS',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.isGPS, 'YesNoEnum'));
          }
        },
        {
          title: 'GPS安装状态',
          key: 'GPSstate'
        },
        {
          title: '操作',
          key: 'action',
          width: 210,
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
                  }
                }
              }, '办理抵押'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$data.GPSinstallShowModal = true;
                    this.$data.clickRow = params.row;
                  }
                }
              }, 'GPS安装落实')
            ]);
          }
        }
      ],
      carData: [
        {
          'carBrandName': '长安',
          'carModel': 'CS75',
          'carPlateNo': '渝B 88888',
          'carEngineNo': 'AS6D54W84XASD',
          'carFrameNo': 'AS6D54W8D1A6SD',
          'isMortgage': '1',
          'isGPS': '1',
          'GPSstate': '1'
        }
      ],
      // 担保信息
      assureColumns: [
        {
          title: '保证人类型',
          align: 'center',
          width: 100,
          key: 'guaPersonType',
          render: (h, params) => {
            return h('span', {}, params.row.guaPersonType === '1' ? '个人' : '企业');
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
          key: 'implementState'
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
                    alert('担保落实');
                  }
                }
              }, '担保落实')
            ]);
          }
        }
      ],
      assureData: [
        {
          'guaPersonType': '1',
          'guaPersonNo': '1111111',
          'guaPersonName': 'mockjs',
          'guaPersonCertType': '2',
          'guaPersonCertNo': '02388888888',
          'guaPersonMobile': '18688888888',
          'implementState': '1'
        }
      ],
      // 放款条件
      conditionColumns: [
        {
          title: '项目',
          align: 'center',
          width: 200,
          key: 'project',
          render: (h, params) => {
            return h('span', {}, params.row.guaPersonType === '1' ? '个人' : '企业');
          }
        },
        {
          title: '备注',
          key: 'remarks',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.remarks
              },
              on: {
                'on-blur': (event) => {
                  this.$data.conditionData[params.index].remarks = event.target.value;
                }
              }
            });
          }
        },
        {
          title: '落实状态',
          key: 'implementState',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.implementState
              },
              on: {
                'on-change': (val) => {
                  this.$data.conditionData[params.index].implementState = val;
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '已落实',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '未落实',
                  value: '2'
                }
              })
            ]);
          }
        }
      ],
      conditionData: [
        {
          'project': 'GPS安装完成',
          'remarks': '备注0001',
          'implementState': '1'
        }
      ],
      // 审批信息
      examineColumns: [
        {
          title: '处理人',
          align: 'center',
          width: 150,
          key: 'name'
        },
        {
          title: '任务节点',
          key: 'taskNode'
        },
        {
          title: '开始时间',
          width: 180,
          key: 'timenStart'
        },
        {
          title: '结束时间',
          width: 180,
          key: 'timeEnd'
        },
        {
          title: '耗时',
          width: 100,
          key: 'long'
        },
        {
          title: '结论',
          width: 200,
          key: 'conclusion'
        },
        {
          title: '意见信息',
          width: 300,
          key: 'opinion'
        }
      ],
      examineData: [],
      // GPS安装信息
      GPSinstallColumns: [
        {
          title: 'GPS型号',
          width: 150,
          key: 'GPSModel'
        },
        {
          title: 'IMEI',
          key: 'IMEI'
        },
        {
          title: 'GPS合作商',
          width: 180,
          key: 'GPScooperative'
        },
        {
          title: '安装状态',
          width: 180,
          key: 'installState'
        },
        {
          title: '办理人',
          width: 100,
          key: 'handleName'
        },
        {
          title: '办理时间',
          width: 200,
          key: 'handleTime'
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
                    this.$data.isAddGPS = false;
                    this.$data.GPSShowModal = true;
                    this.$data.formAddGPS = params.row;
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
                    // this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      GPSinstallData: [
        {
          'GPSModel': '型号1',
          'IMEI': 'IMEI1',
          'GPScooperative': 'GPS合作商1',
          'installState': '1',
          'handleName': '马云',
          'handleTime': '2017-12-27'
        }
      ]
    };
  }
};
