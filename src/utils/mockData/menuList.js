export default [
  {
    url: '/sys/menu/list',
    on: true,
    type: 'get',
    resp: {
      'body': {
        'childMenus': [
          {
            'childMenus': [
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 144,
                    'name': '所有订单列表',
                    'orderNum': null,
                    'parentId': 143,
                    'perms': '',
                    'type': 1,
                    'url': '/index/loanbusiness/alllist'
                  },
                  {
                    '$ref': '$.body.childMenus[0].childMenus[0].childMenus[0]'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 143,
                'name': '业务查询',
                'orderNum': 3,
                'parentId': 122,
                'perms': '',
                'type': 1,
                'url': '/index/loanbusiness'
              }
            ],
            'gmtCreate': null,
            'gmtModified': null,
            'icon': '',
            'menuId': 122,
            'name': '贷款业务',
            'orderNum': 1,
            'parentId': 98,
            'perms': '',
            'type': 1,
            'url': '/index/loanbusiness'
          },
          {
            'childMenus': [
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 201,
                    'name': '已签署合同列表',
                    'orderNum': 3,
                    'parentId': 184,
                    'perms': '',
                    'type': 1,
                    'url': '/index/contract/signSucceed'
                  },
                  {
                    '$ref': '$.body.childMenus[1].childMenus[0].childMenus[0]'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 202,
                    'name': '待签署合同列表',
                    'orderNum': 2,
                    'parentId': 184,
                    'perms': '',
                    'type': 1,
                    'url': '/index/contract/sign'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 203,
                    'name': '待制作合同列表',
                    'orderNum': 1,
                    'parentId': 184,
                    'perms': '',
                    'type': 1,
                    'url': '/index/contract/list'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 184,
                'name': '合同管理',
                'orderNum': null,
                'parentId': 181,
                'perms': '',
                'type': 1,
                'url': '/index/contract/list'
              }
            ],
            'gmtCreate': null,
            'gmtModified': null,
            'icon': '',
            'menuId': 181,
            'name': '合同管理',
            'orderNum': 2,
            'parentId': 98,
            'perms': '',
            'type': 1,
            'url': '/index/contract'
          },
          {
            'childMenus': [
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 193,
                    'name': '放款条件落实',
                    'orderNum': null,
                    'parentId': 192,
                    'perms': '',
                    'type': 1,
                    'url': '/index/operate/loan'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 194,
                    'name': 'GPS安装落实',
                    'orderNum': null,
                    'parentId': 192,
                    'perms': '',
                    'type': 1,
                    'url': '/index/operate/loan/GPS'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 192,
                'name': '放款管理',
                'orderNum': 1,
                'parentId': 189,
                'perms': '',
                'type': 1,
                'url': '/index/operate/loan'
              },
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 191,
                    'name': '权证待办列表',
                    'orderNum': 1,
                    'parentId': 190,
                    'perms': '',
                    'type': 1,
                    'url': '/index/operate/pawn'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 190,
                'name': '权证管理',
                'orderNum': 2,
                'parentId': 189,
                'perms': '',
                'type': 1,
                'url': '/index/operate/pawn'
              }
            ],
            'gmtCreate': null,
            'gmtModified': null,
            'icon': '',
            'menuId': 189,
            'name': '运营管理',
            'orderNum': 3,
            'parentId': 98,
            'perms': '',
            'type': 1,
            'url': '/index/operate'
          },
          {
            'childMenus': [
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 215,
                    'name': '一次放款查询',
                    'orderNum': 3,
                    'parentId': 150,
                    'perms': '',
                    'type': 1,
                    'url': '/index/financemanage/proxypay/detail1'
                  },
                  {
                    '$ref': '$.body.childMenus[3].childMenus[0].childMenus[0]'
                  },
                  {
                    '$ref': '$.body.childMenus[3].childMenus[0].childMenus[0]'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 216,
                    'name': '二次放款查询',
                    'orderNum': 4,
                    'parentId': 150,
                    'perms': '',
                    'type': 1,
                    'url': '/index/financemanage/proxypay/detail2'
                  },
                  {
                    '$ref': '$.body.childMenus[3].childMenus[0].childMenus[3]'
                  },
                  {
                    '$ref': '$.body.childMenus[3].childMenus[0].childMenus[3]'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 150,
                'name': '代付管理',
                'orderNum': null,
                'parentId': 148,
                'perms': '',
                'type': 1,
                'url': '/index/financemanage/proxypay'
              },
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 219,
                    'name': '代扣查询',
                    'orderNum': null,
                    'parentId': 172,
                    'perms': '',
                    'type': 2,
                    'url': '/index/financemanage/proxyreceive/detail'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 172,
                'name': '代扣管理',
                'orderNum': null,
                'parentId': 148,
                'perms': '',
                'type': 1,
                'url': '/index/financemanage/proxyreceive'
              }
            ],
            'gmtCreate': null,
            'gmtModified': null,
            'icon': '',
            'menuId': 148,
            'name': '财务管理',
            'orderNum': 4,
            'parentId': 98,
            'perms': '',
            'type': 1,
            'url': '/index/financemanage'
          },
          {
            'childMenus': [
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 106,
                    'name': '个人客户列表',
                    'orderNum': null,
                    'parentId': 100,
                    'perms': '',
                    'type': 1,
                    'url': '/index/customer/privatecustomer'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 107,
                    'name': '个人客户添加',
                    'orderNum': null,
                    'parentId': 100,
                    'perms': '',
                    'type': 1,
                    'url': '/index/customer/privatecustomer/add'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 100,
                'name': '个人客户管理',
                'orderNum': null,
                'parentId': 99,
                'perms': '',
                'type': 1,
                'url': ''
              },
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 136,
                    'name': '渠道商列表',
                    'orderNum': null,
                    'parentId': 135,
                    'perms': '',
                    'type': 1,
                    'url': '/index/customer/distributor'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 135,
                'name': '渠道商管理',
                'orderNum': null,
                'parentId': 99,
                'perms': '',
                'type': 0,
                'url': ''
              },
              {
                'childMenus': [
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 109,
                    'name': '企业客户列表',
                    'orderNum': null,
                    'parentId': 108,
                    'perms': '',
                    'type': 1,
                    'url': '/index/customer/companycustomer'
                  },
                  {
                    'childMenus': [],
                    'gmtCreate': null,
                    'gmtModified': null,
                    'icon': '',
                    'menuId': 110,
                    'name': '企业客户新增',
                    'orderNum': null,
                    'parentId': 108,
                    'perms': '',
                    'type': 1,
                    'url': '/index/customer/companycustomer/modify'
                  }
                ],
                'gmtCreate': null,
                'gmtModified': null,
                'icon': '',
                'menuId': 108,
                'name': '企业客户管理',
                'orderNum': null,
                'parentId': 99,
                'perms': '',
                'type': 0,
                'url': ''
              }
            ],
            'gmtCreate': null,
            'gmtModified': null,
            'icon': '',
            'menuId': 99,
            'name': '客户档案',
            'orderNum': 6,
            'parentId': 98,
            'perms': '',
            'type': 1,
            'url': '/index/customer'
          }
        ],
        'gmtCreate': null,
        'gmtModified': null,
        'icon': '',
        'menuId': 98,
        'name': '运营支撑管理系统',
        'orderNum': 5,
        'parentId': 0,
        'perms': '',
        'type': 0,
        'url': ''
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  }
];
