import Mock from 'mockjs';
export default [
  // 产品管理
  {
    url: '/product',
    resp: Mock.mock({
      reCode: '0',
      'list|1-20': [
        {
          'codeId|+1': 1,
          'productNumber': 'CP1001',
          'productName': '@name',
          'productType|1': ['乘用车', '商用车', '轻卡', '微卡', '新能源'],
          'productState': '启用',
          'creationTime': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@now("yyyy-MM-dd HH:mm:ss")',
          'Founder': '@name'
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理-贷款材料配置
  {
    url: '/productLoan',
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'loanId|+1': 1,
          'loanName': /[测试字体]{4,30}/
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理-费用类型配置
  {
    url: '/productCost',
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'costId|+1': 1,
          'costName': '@name',
          'costDirection|1': ['收入', '支出']
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理-准入规则配置
  {
    url: '/productRule',
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'ruleId|+1': 1,
          'ruleName': /[测试字体]{4,30}/
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理-车辆材料配置
  {
    url: '/productCar',
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'carId|+1': 1,
          'carName': /[测试字体]{4,30}/
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理-归档材料配置
  {
    url: '/productFile',
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'fileId|+1': 1,
          'fileName': /[测试字体]{4,30}/
        }
      ],
      reMsg: 'success'
    })
  },
  // 产品管理
  {
    url: '/productDetails',
    resp: Mock.mock({
      reCode: '0',
      list: {
        'data1|1-5': [
          {
            'TcID|+1': 1,
            'TcName': '@name',
            'TcType|1': ['套餐类型1', '套餐类型2', '套餐类型3', '套餐类型4', '套餐类型5'],
            'TcTerm|1': ['12', '18', '24'],
            'TcMode|1': ['正常还款', '逾期还款', '提前还款', '续贷'],
            'TcCycle|1': ['12', '18', '24'],
            'TcOption|1': ['正常还款', '逾期还款', '提前还款', '续贷'],
            'TcRate|1': ['0.1%', '0.15%', '0.2%', '0.25%', '0.3%']
          }
        ],
        'data2|1-5': [
          {
            'FyOption|1': ['选择1', '选择2', '选择3'],
            'FyType|1': ['类型1', '类型2', '类型3'],
            'FyStandard|1': ['标准1', '标准2', '标准3']
          }
        ],
        'data3|1-5': [
          {
            'BillID|+1': 1,
            'BillType|1': ['类型1', '类型2', '类型3'],
            'BillNmae': '@name',
            'isOriginal|1': ['是', '否'],
            'isCopy|1': ['是', '否'],
            'isImage|1': ['是', '否'],
            'isVideo|1': ['是', '否']
          }
        ]
      },
      reMsg: 'success'
    })
  }
];
