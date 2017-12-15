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
  // 渠道商车型信息列表分页查询
  {
    url: '/merchant/listVhc',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'modelId|+1': 678,
            'modelName': 'CS75',
            'guidancePrice|+100': 156800,
            'sellingPrice|+100': 136800,
            'salesStatus|1': ['在售', '停售']
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
    url: '/merchant/pageDistributorAdmin',
    type: 'get',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 4,
        'resultList|10': [
          {
            'merchantNo|+1': 11111,
            'corpNo|+1': 1111111,
            'adminType|1': ['1', '2'],
            'status|1': ['0', '1']
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
