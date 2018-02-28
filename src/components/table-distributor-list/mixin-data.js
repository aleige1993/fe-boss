import BsTooltip from '@/components/bs-tooltip';
export default {
  components: {
    BsTooltip
  },
  data() {
    return {
      distributorColumns: [
        {
          title: '渠道商编号',
          width: 80,
          key: 'merchantNo'
        },
        {
          title: '渠道商属性',
          width: 80,
          key: 'merchantType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.merchantType, 'MerchantTypeEnum'));
          }
        },
        {
          title: '渠道商简称',
          width: 150,
          key: 'merchantAbbr'
        },
        {
          title: '客户编号',
          width: 170,
          key: 'corpNo'
        },
        {
          title: '客户名称',
          width: 150,
          key: 'corpName'
        },
        {
          title: '上级渠道商名称',
          width: 150,
          key: 'pcorpName'
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
          title: '注册资金(万元)',
          width: 120,
          key: 'regCapital'
        },
        {
          title: '公司电话',
          width: 115,
          key: 'telephone'
        },
        {
          title: '授信总额度(元)',
          width: 120,
          key: 'creditTotalLimit'
        },
        {
          title: '可用额度(元)',
          width: 120,
          key: 'currentUsableLimit'
        },
        {
          title: '单笔最大可用额度(元)',
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
        },
        {
          title: '启停状态', // 0:冻结1:激活
          width: 100,
          key: 'enableStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.enableStatus, 'EnableStatusEnum'));
          }
        },
        {
          title: '二维码',
          width: 100,
          key: 'qrCodeUrl',
          render: (h, params) => {
            return h('div', [
              h('bs-big-img', {
                props: {
                  thumbWidth: 50,
                  thumbHeight: 50,
                  // fullWidth: 500,
                  thumb: params.row.qrCodeUrl,
                  full: params.row.qrCodeUrl
                },
                style: {
                  'paddingTop': '10px',
                  'paddingBottom': '10px'
                }
              })/* ,
              h('br', {}),
              h('a', {
                props: {
                  display: 'block',
                  href: 'params.row.qrCodeUrl',
                  target: '_blank'
                },
                style: {
                  'textDecoration': 'underline'
                },
                on: {
                  click: () => {
                    window.open(params.row.qrCodeUrl, '_blank');
                  }
                }
              }, '预览/下载二维码')*/
            ]);
          }
        },
        {
          title: '渠道商服务地区', // 数组集合
          width: 200,
          key: 'merchantAreaInfo',
          render: (h, params) => {
            let areaAry = params.row.merchantAreaInfo;
            let cityNames = '';
            if (areaAry && (areaAry.length > 0)) {
              for (let item of areaAry) {
                cityNames += (item.provinceName + item.districtName + '; ');
              }
              // 当城市名多于100字时 用...代替
              let showCityNames = '';
              if (cityNames.length > 100) {
                showCityNames = cityNames.substring(0, cityNames.slice(0, 100).lastIndexOf(';')) + '...';
                return h(BsTooltip, {
                  props: {
                    showText: showCityNames + '',
                    tipText: cityNames.toString().substring(0, cityNames.lastIndexOf(';')),
                    placement: 'left',
                    width: '200',
                    wordBreak: 'break-all',
                    whiteSpace: 'normal'
                  }
                });
              } else {
                showCityNames = cityNames.substring(0, cityNames.lastIndexOf(';'));
                return h('p', {}, showCityNames);
              }
            }
          }
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          width: 230,
          align: 'center',
          fixed: 'right',
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
                  type: params.row.enableStatus === '0' ? 'warning' : 'info',
                  disabled: params.row.merchantStatus === '1' || params.row.merchantStatus === '6' // 渠道商状态为申请中和变更中是不能点
                },
                on: {
                  click: () => {
                    this.congeal($.extend({}, params.row));
                  }
                }
              }, this.merchantStatusBtnText(params.row))
            ]);
          }
        }
      ],
      distributorList: []
    };
  },
  methods: {
    merchantStatusBtnText(row) {
      let BtnText = '';
      if (row.enableStatus === '0') {
        BtnText = '激活';
      }
      if (row.enableStatus === '1') {
        BtnText = '冻结';
      }
      return BtnText;
    }
  }
};
