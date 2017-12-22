export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '授信总额度',
          key: 'creditTotalLimit'
        },
        {
          title: '单笔最大额度',
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
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          key: 'applyStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.applyStatus, 'MerchantStatusEnum'));
          }
        },
        {
          title: '操作',
          width: 200,
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
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
              }, '审核历史')
            ]);
          }
        }
      ],
      distributorList: []
    };
  }
};