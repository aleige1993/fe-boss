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
          key: 'isBill',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.isBill
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].isBill = val;
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
          key: 'AMted',
          render: (h, params) => {
            return h('i-input', {
              props: {
                'value': params.row.AMted
              },
              on: {
                'on-blur': (event) => {
                  this.$data.feeData[params.index].AMted = event.target.value;
                }
              }
            });
          }
        },
        {
          title: '收取方式',
          key: 'isCollect',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.isCollect
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].isCollect = val;
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '现金',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '转账',
                  value: '2'
                }
              }),
              h('i-option', {
                props: {
                  label: 'POS',
                  value: '3'
                }
              }),
              h('i-option', {
                props: {
                  label: '支票',
                  value: '4'
                }
              })
            ]);
          }
        },
        {
          title: '是否结清',
          key: 'isSettle',
          width: 200,
          render: (h, params) => {
            return h('i-select', {
              props: {
                'value': params.row.isSettle
              },
              on: {
                'on-change': (val) => {
                  this.$data.feeData[params.index].isSettle = val;
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
      feeData: [
        {
          'feeName': '费用项目001',
          'feeTakeType': '1',
          'feePercent': '1',
          'feeAmt': '1111',
          'feeActualAmt': '1111',
          'isBill': '0',
          'AMted': '1111',
          'isCollect': '1',
          'isSettle': '1'
        }
      ],
      // 放款条件
      conditionColumns: [
        {
          title: '项目',
          align: 'center',
          width: 200,
          key: 'project'
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
                  label: '未落实',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '已落实',
                  value: '2'
                }
              })
            ]);
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
