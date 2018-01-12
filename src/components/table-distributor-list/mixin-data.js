export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          width: 80,
          key: 'merchantNo'
        },
        {
          title: '渠道商类型',
          width: 80,
          key: 'merchantType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.merchantType, 'MerchantTypeEnum'));
          }
        },
        {
          title: '渠道商简称',
          width: 80,
          key: 'merchantAbbr'
        },
        {
          title: '客户编号',
          width: 170,
          key: 'corpNo'
        },
        {
          title: '公司名称',
          width: 150,
          key: 'corpName'
        },
        {
          title: '统一社会信用代码',
          width: 150,
          key: 'suCreditCode'
        },
        {
          title: '法定代表人',
          width: 80,
          key: 'legalPerson'
        },
        {
          title: '注册时间',
          width: 110,
          key: 'regDate'
        },
        {
          title: '注册资金',
          width: 120,
          key: 'regCapital'
        },
        {
          title: '公司电话',
          width: 115,
          key: 'telephone'
        },
        {
          title: '授信总额度',
          width: 120,
          key: 'creditTotalLimit'
        },
        {
          title: '可用额度',
          width: 120,
          key: 'currentUsableLimit'
        },
        {
          title: '单笔最大可用额度',
          width: 120,
          key: 'singleUsableLimit'
        },
        {
          title: '是否在app中显示',
          width: 75,
          key: 'isDisplayInApp',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.isDisplayInApp, 'YesNoEnum'));
          }
        },
        {
          title: '渠道商状态', // 0:未授信1-授信申请中2-已授信5-授信过期6-冻结
          width: 100,
          key: 'merchantStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.merchantStatus, 'MerchantStatusEnum'));
          }
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          width: 230,
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
                        corpNo: params.row.corpNo, // 公司编号
                        memberNo: params.row.memberNo,
                        merchantNo: params.row.merchantNo, // 渠道商编号
                        creditList: false,
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
                    let rowData = $.extend({}, params.row);
                    this.$emit('on-set-row', rowData);
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error',
                  disabled: params.row.merchantStatus !== '0'
                },
                on: {
                  click: () => {
                    if (params.row.merchantStatus === '0') {
                      this.remove($.extend({}, params.row));
                    }
                  }
                }
              }, '删除'),
              h('i-button', {
                props: {
                  type: 'warning',
                  disabled: params.row.merchantStatus === '6'
                },
                on: {
                  click: () => {
                    Alertify.confirm('确定要冻结当前用户吗？', async (ok) => {
                      if (ok) {
                        this.congeal($.extend({}, params.row));
                      }
                    });
                  }
                }
              }, '冻结')
            ]);
          }
        }
      ],
      distributorList: []
    };
  }
};
