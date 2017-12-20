export default {
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          width: '100',
          key: 'merchantNo'
        },
        {
          title: '渠道商类型',
          width: '100',
          key: 'merchantType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.merchantType, 'MerchantTypeEnum'));
          }
        },
        {
          title: '客户编号',
          width: '110',
          key: 'corpNo'
        },
        {
          title: '公司名称',
          key: 'corpName'
        },
        {
          title: '统一社会信用代码',
          key: 'suCreditCode'
        },
        {
          title: '法定代表人',
          key: 'legalPerson'
        },
        {
          title: '注册时间',
          width: '110',
          key: 'regDate'
        },
        {
          title: '注册资金',
          key: 'regCapital'
        },
        {
          title: '公司电话',
          key: 'telephone'
        },
        {
          title: '授信状态', // 0:未授信1-授信审核中2-授信通过3-授信拒绝4-授信驳回5-授信过期6-冻结
          width: '90',
          key: 'merchantStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.merchantStatus, 'MerchantStatusEnum'));
          }
        },
        {
          title: '操作',
          width: 260,
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
                    this.$data.isAdd = false;
                    this.$data.showAddModal = true;
                    this.$data.formAdd = params.row;
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
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
              /*h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    alert(params.row.merchantNo);
                  }
                }
              }, '操作员管理')*/
            ]);
          }
        }
      ],
      distributorList: []
    };
  }
};
