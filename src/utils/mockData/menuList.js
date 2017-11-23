export default [
  {
    url: '/sys/menu/list?menuId=98',
    on: true,
    resp: {
      reCode: '0000',
      body: {
        'childMenus': [
          {
            name: '客户档案',
            url: '/index/customer',
            childMenus: [
              {
                name: '个人客户管理',
                url: '/index/customer',
                childMenus: [
                  {
                    name: '个人客户列表',
                    url: '/index/customer'
                  },
                  {
                    name: '个人客户添加',
                    url: '/index/customer/modify'
                  }
                ]
              },
              {
                name: '企业客户管理',
                url: '',
                childMenus: [
                  {
                    name: '企业客户列表',
                    url: '/index/customer/companycustomer'
                  },
                  {
                    name: '企业客户添加',
                    url: '/index/customer/companycustomer/modify'
                  }
                ]
              },
              {
                name: '黑名单管理',
                url: '',
                childMenus: [
                  {
                    name: '黑名单列表',
                    url: '/index/customer/blacklist'
                  }
                ]
              }
            ]
          },
          {
            name: '配置管理',
            url: '/index/conf',
            childMenus: [
              {
                name: '产品配置',
                url: '/index/conf/product',
                childMenus: [
                  {
                    name: '产品列表',
                    url: '/index/conf/product'
                  },
                  {
                    name: '贷款材料配置',
                    url: '/index/conf/product/loan'
                  },
                  {
                    name: '费用类型配置',
                    url: '/index/conf/product/cost'
                  },
                  {
                    name: '准入规则配置',
                    url: '/index/conf/product/rule'
                  },
                  {
                    name: '车辆材料配置',
                    url: '/index/conf/product/car'
                  },
                  {
                    name: '归档材料配置',
                    url: '/index/conf/product/file'
                  }
                ]
              },
              {
                name: '资方管理',
                url: '/index/conf/invest',
                childMenus: [
                  {
                    name: '资方维护',
                    url: '/index/conf/invest/'
                  },
                  {
                    name: '资方映射配置',
                    url: '/index/conf/invest/mapping'
                  },
                  {
                    name: '合同模板维护',
                    url: '/index/conf/invest/contract'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
];