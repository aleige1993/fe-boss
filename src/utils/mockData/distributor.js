import Mock from 'mockjs';
export default [
  {
    url: '/commonTestAjax',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList': [],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/merchant/statusMerchant',
    type: 'get',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/merchant/changeStatus',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商授信额度分页查询
  {
    url: '/merchant/credit/list',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'totalNum': 15,
        'resultList|15': [
          {
            'merchantNo': '111111111', // 渠道商编号
            'applyNo': '111111',
            'creditTotalLimit|500-1000': 500,
            'singleUsableLimit|500-1000': 500,
            'creditStartDate': '@date()',
            'creditEndDate': '@date()',
            'creditReleaseType|1': ['1'],
            'applyUserCode': '123456',
            'applyUserName': '@name',
            'applyTime': '@date',
            'applyStatus|1': ['0', '1', '2', '3', '4', '7', '8'],
            'merchantAbbr': 'mockjs',
            'corpName': 'mockjs',
            'corpNo': '111111',
            'custMgrNo': '111111',
            'custMgrName': '111111'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商列表信息列表分页查询
  {
    url: '/merchant/listMerchant',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'merchantNo': '123456789123456789', // 渠道商编号
            'isEnablePlatform|1': ['1', '2'],
            'merchantType|1': ['1', '2', '3'], // 渠道商类型 1.4S店2.一网商3.二网商
            'corpNo|+1': 111111, // 公司编号
            'corpName': '@name', // 公司名称
            'suCreditCode': '111111', // 统一社会信用代码
            'legalPerson': '111111', // 法定代表人
            'regDate': '2017-12-16', // 注册时间
            'regCapital': '900000', // 注册资金
            'telephone': '02388888888', // 公司电话
            'creditTotalLimit': '9999999',
            'currentUsableLimit': '9999999',
            'singleUsableLimit': '9999999',
            'isDisplayInApp|1': ['0', '1'], // 是否在APP中显示
            'merchantStatus|1': ['0', '1', '2', '5'], // 渠道商状态
            'enableStatus|1': ['0', '1'], // 渠道商状态 激活/冻结
            'custMgrName': '11111111', // 客户经理编号
            'qrCodeUrl': 'http://10.164.1.115:8080/#/',
            'merchantAreaInfo|5': [
              {
                'provinceName': '重庆市',
                'provinceCode': '500000',
                'districtName': '重庆市城区',
                'districtCode': '500100'
              },
              {
                'provinceName': '@province',
                'provinceCode|500000-900000': 500000,
                'districtName': '@province',
                'districtCode|500000-900000': 500000
              }
            ]
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商车型信息列表分页查询
  {
    url: '/merchant/car/list',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'modelNo|+1': 678,
            'modelName': 'CS75',
            'guidancePrice|+100': 156800,
            'sellingPrice|+100': 136800,
            'salesStatus|1': ['0', '1']
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商渠道商操作员管理列表
  {
    url: '/merchant/operator/list',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'merchantNo|+1': 11111,
            'operatorCode|+1': 1111111,
            'operatorType|1': ['1', '2'],
            'operatorStatus|1': ['0', '1']
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商渠道商授信审核列表
  {
    url: '/merchant/credit/auditList',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'merchantNo': '123456789123456789', // 渠道商编号
            'corpName': 'mockjs', // 公司名称
            'creditTotalLimit': '9999999',
            'singleUsableLimit': '9999999',
            'creditStartDate': '@date',
            'creditEndDate': '@date',
            'creditReleaseType': '1',
            'applyStatus|1': ['0', '1', '2', '3', '4', '7', '8']
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商渠道商授信审核按钮 验证
  {
    url: '/merchant/credit/startApprove',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 渠道商角色管理列表
  {
    url: '/merchant/role/pageQueryRoleAndModule',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'merchantName': 'mockjs',
            'merchantNo': '123123123',
            'coleName': '123121231233123',
            'coleNo': '123121231233123',
            'authorityName': '11111123',
            'authorityNo': '11111123',
            'CreateDate': '@date',
            'SetDate': '@date'
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 2
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
