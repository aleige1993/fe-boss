export default {
  data() {
    return {
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
            return h('i-select', {
              props: {
                'value': params.row.isHang
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].isHang = val;
                }
              }
            }, this.enumSelectData.get('YesNoEnum').map((item) => {
              return h('i-option', {
                props: {
                  label: item.itemName,
                  value: item.itemCode
                }
              });
            }));
          }
        },
        {
          title: '已收金额(元)',
          key: 'alreadyReceivAmt',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.alreadyReceivAmt
              },
              on: {
                'on-blur': (event) => {
                  this.$data.feeData[params.index].alreadyReceivAmt = event.target.value;
                }
              }
            });
          }
        },
        {
          title: '收取方式',
          key: 'receivMode',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.receivMode
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].receivMode = val;
                }
              }
            }, this.enumSelectData.get('ReceivModeEnum').map((item) => {
              return h('i-option', {
                props: {
                  label: item.itemName,
                  value: item.itemCode
                }
              });
            }));
          }
        },
        {
          title: '是否结清',
          key: 'isClearing',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.isClearing
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].isClearing = val;
                }
              }
            }, this.enumSelectData.get('YesNoEnum').map((item) => {
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
          key: 'remark',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.remark,
                'readonly': params.row.status === '1'
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
                'value': params.row.status,
                'disabled': params.row.status === '1'
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
      conditionData: [],
      // 审批信息
      examineColumns: [
        {
          title: '处理人',
          align: 'center',
          width: 180,
          key: 'name'
        },
        {
          title: '任务节点',
          key: 'taskNode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.taskNode, 'LoanBizNodeEnum'));
          }
        },
        {
          title: '开始时间',
          width: 120,
          key: 'timenStart'
        },
        {
          title: '结束时间',
          width: 120,
          key: 'timeEnd'
        },
        {
          title: '耗时',
          width: 100,
          key: 'longTime'
        },
        {
          title: '结论',
          key: 'conclusion'
        },
        {
          title: '意见信息',
          key: 'opinion'
        }
      ],
      examineData: []
    };
  }
};
