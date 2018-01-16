export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          key: 'merchantNo'
        },
        {
          title: '公司名称',
          key: 'corpName'
        },
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
          title: '授信状态',
          key: 'applyStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.applyStatus, 'MerchantCreditStatusEnum'));
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
                      path: '/index/customer/distributor/details',
                      query: {
                        corpNo: params.row.corpNo,
                        memberNo: params.row.memberNo,
                        merchantNo: params.row.merchantNo,
                        creditList: true,
                        from: 'detail'
                      }
                    });
                  }
                }
              }, '详情'),
              h('i-button', {
                props: {
                  type: 'success'
                },
                on: {
                  click: async() => {
                    let reps = await this.$http.post('merchant/credit/startApprove', {
                      merchantNo: params.row.merchantNo,
                      applyNo: params.row.applyNo,
                      applyStatus: params.row.applyStatus
                    });
                    if (!reps.success) {
                      this.$Message.error(reps.reMsg);
                    } else {
                      this.$router.push({
                        path: '/index/customer/distributor/credit/examine',
                        query: {
                          applyNo: params.row.applyNo,
                          merchantNo: params.row.merchantNo,
                          hasTab: true
                        }
                      });
                    }
                  }
                }
              }, '审核')
            ]);
          }
        }
      ],
      distributorList: []
    };
  }
};
