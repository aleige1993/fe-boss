export default [
  {
    url: '/sys/menu/list',
    on: true,
    type: 'get',
    resp: {
      reCode: '0000',
      body: {
        'childMenus': [
          // 客户档案
          {
            name: '客户档案',
            url: '/index/customer',
            childMenus: [
              {
                name: '个人客户管理',
                url: '/index/customer',
                childMenus: [
                  { name: '个人客户列表', url: '/index/customer' },
                  { name: '个人客户添加', url: '/index/customer/add' }
                ]
              },
              {
                name: '企业客户管理',
                url: '',
                childMenus: [
                  { name: '企业客户列表', url: '/index/customer/companycustomer' },
                  { name: '企业客户添加', url: '/index/customer/companycustomer/modify' }
                ]
              },
              {
                name: '黑名单管理',
                url: '',
                childMenus: [
                  { name: '黑名单列表', url: '/index/customer/blacklist' }
                ]
              },
              {
                name: '渠道商管理',
                url: '',
                childMenus: [
                  { name: '渠道商列表', url: '/index/customer/distributor' }
                ]
              }
            ]
          },
          // 贷款业务
          {
            name: '贷款业务',
            url: '/index/loanbusiness',
            childMenus: [
              {
                name: '业务查询',
                url: '/index/loanbusiness',
                childMenus: [
                  { name: '业务查询', url: '/index/loanbusiness' }
                ]
              },
              {
                name: '业务受理',
                url: '/index/loanbusiness/accept',
                childMenus: [
                  { name: '个人业务登记', url: '/index/loanbusiness/accept' },
                  { name: '公司业务登记', url: '/index/loanbusiness/companyaccept' }
                  /* { name: '我的草稿', url: '/index/customer/companycustomer/modify' }*/
                ]
              },
              /* {
                name: '业务审批',
                url: '',
                childMenus: [
                  { name: '黑名单列表', url: '/index/customer/blacklist' }
                ]
              },*/
              { name: '公司授信管理',
                url: '/index/loanbusiness/credit',
                childMenus: [
                  { name: '公司授信查询', url: '/index/loanbusiness/credit' },
                  { name: '公司授信申请', url: '/index/loanbusiness/credit/apply' },
                  { name: '公司授信初审', url: '/index/loanbusiness/credit/pending' },
                  { name: '公司授信外审', url: '/index/loanbusiness/credit/externalapprove' },
                  { name: '公司授信审批', url: '/index/loanbusiness/credit/approve' }
                ]
              }
            ]
          },
          // 配置管理
          {
            name: '配置管理',
            url: '/index/conf',
            childMenus: [
              {
                name: '产品配置',
                url: '/index/conf/product',
                childMenus: [
                  { name: '产品列表', url: '/index/conf/product' },
                  { name: '贷款材料配置', url: '/index/conf/product/loan' },
                  { name: '费用类型配置', url: '/index/conf/product/cost' },
                  { name: '准入规则配置', url: '/index/conf/product/rule' },
                  { name: '车辆材料配置', url: '/index/conf/product/car' },
                  { name: '归档材料配置', url: '/index/conf/product/file' }
                ]
              },
              {
                name: '资方管理',
                url: '/index/conf/invest',
                childMenus: [
                  { name: '资方维护', url: '/index/conf/invest/' },
                  { name: '资方映射配置', url: '/index/conf/invest/mapping' },
                  { name: '合同模板维护', url: '/index/conf/invest/contract' }
                ]
              }
            ]
          }
          // 配置管理 end
        ]
      }
    }
  }
];
