import Mock from 'mockjs';
export default [
  // 产品配置
  {
    url: '/manage-product',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'codeId|+1': 1,
            'proNumber': 'CP1001',
            'proName|1': ['产品名称1', '产品名称2', '产品名称3', '产品名称4', '产品名称5'],
            'ProductTypeEnum|1': ['1', '2', '3', '4', '5'],
            'ProductStatusEnum|1': ['1', '2'],
            'creationTime': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            'updateTime': '@now("yyyy-MM-dd HH:mm:ss")',
            'Founder': '@name'
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-贷款材料配置
  {
    url: '/productLoan',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'loanId|+1': 1,
          'loanName': /[测试字体]{4,30}/
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置-费用类型配置
  {
    url: '/productCost',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'costId|+1': 1,
          'costName': '@name',
          'costDirection|1': ['收入', '支出']
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置-准入规则配置
  {
    url: '/productRule',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'ruleId|+1': 1,
          'ruleName': /[测试字体]{4,30}/
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置-车辆材料配置
  {
    url: '/productCar',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'carId|+1': 1,
          'carName': /[测试字体]{4,30}/
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置-归档材料配置
  {
    url: '/productFile',
    on: true,
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
  // 产品配置-利率方案配置
  {
    url: '/productLilv',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'car|1': ['轿车', 'SUV', '轻卡', '微卡'],
          'month|1': ['3', '6', '12', '18', '24'],
          'rate|1': ['0.1', '0.15', '0.2']
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置-费用收取配置弹窗
  {
    url: '/productFy',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|1-5': [
        {
          'id|+1': 1,
          'name|1': ['费用类型名称1', '费用类型名称2', '费用类型名称3', '费用类型名称4'],
          'mode|1': ['按比例', '按固定金额'],
          'direction|1': ['收入', '支出'],
          'standard|1': ['0.1', '0.15', '0.2'],
          'money|50-3000': 50
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置
  {
    url: '/productDetails',
    on: true,
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
      reMsg: '成功'
    })
  }
];
