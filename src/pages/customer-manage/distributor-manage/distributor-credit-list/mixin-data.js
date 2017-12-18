export default {
  data() {
    return {
      distributorColumns: [],
      distributorList: [
        {
          'corpNo': '111',
          'merchantNo': '111111111',
          'merchantName': '海尔云贷',
          'creditTotalLimit': '900000000',
          'currentUsableLimit': '90000000',
          'singleUsableLimit': '900000000',
          'creditStartDate': '2017-12-14 00:00:00',
          'creditEndDate': '2017-12-14 00:00:00',
          'creditReleaseType': '额度释放方式01',
          'applyStatus': '未授信' // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
        }
      ]
    };
  },
  mounted() {
    if (this.isDetail) {
      this.$data.distributorColumns = [
        {
          title: '授信总额度',
          key: 'creditTotalLimit'
        },
        {
          title: '可用额度',
          key: 'currentUsableLimit'
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
          key: 'creditReleaseType'
        },
        {
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          key: 'applyStatus'
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
                        corpNo: params.row.corpNo,
                        memberNo: params.row.memberNo,
                        merchantNo: params.row.merchantNo,
                        from: 'detail'
                      }
                    });
                  }
                }
              }, '审核历史')
            ]);
          }
        }
      ];
    } else {
      this.$data.distributorColumns = [
        {
          title: '渠道商编号',
          key: 'merchantNo'
        },
        {
          title: '公司名称',
          key: 'merchantName'
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
          key: 'creditReleaseType'
        },
        {
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          key: 'applyStatus'
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
                  click: () => {
                    this.$router.push({
                      path: '/index/customer/distributor/credit/examine',
                      query: {
                        memberNo: params.row.memberNo,
                        merchantNo: params.row.merchantNo
                      }
                    });
                  }
                }
              }, '审核')
            ]);
          }
        }
      ];
    }
  }
};
