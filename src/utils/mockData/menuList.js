export default [
  {
    url: '/sys/menu/list?menuId=98',
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
                name: '公司客户管理',
                url: '/index/customer/company'
              }
            ]
          },
          {
            name: '配置管理',
            url: '/index/conf',
            childMenus: [
              {
                name: '产品配置',
                url: '/index/conf/product'
              }
            ]
          }
        ]
      }
    }
  }
];
