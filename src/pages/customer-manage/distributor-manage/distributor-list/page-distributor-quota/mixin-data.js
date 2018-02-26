export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '授信总额度(元)',
          key: 'creditTotalLimit'
        },
        {
          title: '单笔最大额度(元)',
          key: 'singleUsableLimit'
        },
        {
          title: '授信起始日期',
          key: 'creditStartDate'
        },
        {
          title: '授信到期日期',
          key: 'creditEndDate'
        },
        {
          title: '额度释放方式',
          key: 'creditReleaseType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.creditReleaseType, 'CreditReleaseTypeEnum'));
          }
        },
        {
          title: '授信状态',
          key: 'applyStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.applyStatus, 'MerchantCreditStatusEnum'));
          }
        },
        {
          title: '操作',
          width: 220,
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/index/customer/distributor/credit/examine/history',
                      query: {
                        applyNo: params.row.applyNo
                      }
                    });
                  }
                }
              }, '审核历史'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: (params.row.applyStatus !== '0') && (params.row.applyStatus !== '4')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setList($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: params.row.applyStatus !== '0'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      distributorList: []
    };
  }
};
