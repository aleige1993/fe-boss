export default {
  data() {
    return {
      columns1: [
        {
          title: '套餐ID',
          key: 'packageNo'
        },
        {
          title: '套餐名称',
          key: 'packageName'
        },
        {
          title: '车类',
          key: 'bizType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.bizType, 'BizTypeEnum'));
          }
        },
        {
          title: '个人单车最低额度',
          key: 'personalSingleCarMinLimit'
        },
        {
          title: '个人单车最高额度',
          key: 'personalSingleCarMaxLimit'
        },
        {
          title: '个人单户额度',
          key: 'personalSingleDoorLimit'
        },
        {
          title: '企业单笔额度',
          key: 'companySingleCarLimit'
        },
        {
          title: '企业单户额度',
          key: 'companySingleDoorLimit'
        },
        {
          title: '还款方式',
          key: 'loanMode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.loanMode, 'RepaymentTypeEnum'));
          }
        },
        {
          title: '运营模式',
          key: 'operatingMode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.operatingMode, 'OperatingModeEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                    this.setList($.extend({}, params.row));
                    this.$data.LlShowModel = true;
                  }
                }
              }, '修改')
              /* h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除')*/
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
