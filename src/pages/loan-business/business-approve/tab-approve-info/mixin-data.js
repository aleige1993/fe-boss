import Tools from '../../../../utils/Tools';

export default {
  data() {
    return {
      accessRuleCol: [
        {
          title: '准入规则',
          key: 'rulename'
        },
        {
          title: '系统筛查意见',
          key: 'approveInfo'
        },
        {
          title: '初审意见',
          key: 'approveRsult',
          render: (h, params) => {
            return h('i-select', {
              on: {
                'on-change': (val) => {
                  this.$Message.success(val);
                }
              }
            }, [
              h('i-option', {
                props: {
                  label: '符合',
                  value: '1'
                }
              }),
              h('i-option', {
                props: {
                  label: '不符合',
                  value: '2'
                }
              }),
              h('i-option', {
                props: {
                  label: '无法核实',
                  value: '3'
                }
              })
            ]);
          }
        }
      ],
      firstApproveColumns: [
        {
          title: '第三方网站名称',
          key: 'itemName'
        },
        {
          title: '查询描述',
          key: 'description'
        },
        {
          title: '查询结果',
          key: 'fileUrl',
          render: (h, params) => {
            if (Tools.isImg(params.row.fileUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  // fullWidth: 500,
                  thumb: params.row.fileUrl,
                  full: params.row.fileUrl
                }
              });
            } else {
              return params.row.fileUrl;
            }
          }
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
                    window.open(params.row.fileUrl, '_blank');
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.creditStatus !== '3'
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.approveData.firstTrialParam.creditCheckItemsList.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      feeMethodCol: [
        {
          title: '费用项目',
          key: 'feeProduct'
        },
        {
          title: '计算方式',
          key: 'feeProduct'
        },
        {
          title: '比例%',
          key: 'feeProduct'
        },
        {
          title: '固定金额（元）',
          key: 'feeProduct'
        },
        {
          title: '应收金额（元）',
          key: 'feeProduct'
        },
        {
          title: '备注',
          key: 'feeProduct'
        }
      ],
      approveData: {
        product: '',
        // 准入规则
        accessRuleList: [
          {
            rulename: 'aaa',
            approveInfo: 'Fdsdsf',
            approveRsult: 'fsdfsdfsd'
          }
        ],
        // 初审信息
        firstTrialParam: {
          netApprove: '',
          telephoneApprove: '',
          creditCheckItemsList: []
        },
        // 审批信息
        creditAuditParam: {
          approveStatus: '',
          opinion: ''
        },
        // 费用收取方案
        feeMethodList: []
      }
    };
  }
};
