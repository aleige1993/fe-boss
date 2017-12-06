import Mock from 'mockjs';
export default [
  {
    url: '/credit/page',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 10,
        'resultList|15': [
          {
            'tacheCode': '@integer(10)',
            'singleLimit': '1212',
            'handleUserName': '张三',
            'endDate': '@date("yyyy-MM-dd")',
            'companyName': '@name',
            'creditLimitReleaseMode': '21541545',
            'creditApplyNo': '124515',
            'creditStatus': '1',
            'surplusCountLimit': '1',
            'quarterSurplusCountLimit': '1',
            'countLimit': '12121',
            'creditCode': '@integer(10)',
            'companyNo': '@integer(10)',
            'monthCountLimit': '2121',
            'handleUserCode': '1212',
            'tacheName': '@name',
            'monthSurplusCountLimit': '1',
            'startDate': '@date("yyyy-MM-dd")',
            'quarterCountLimit': '2'
          }
        ],
        'totalNum': 100
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/credit/find', // creditApplyNo
    on: true,
    resp: Mock.mock({
      'body': {
        'singleLimit': '200000',
        'externalAuditDTOList|5': [
          {
            'itemName': '@name',
            'fileName': '@name',
            'description': '',
            'fileUrl': '@url("http")'
          }
        ],
        'endDate': '@date("yyyy-mm-dd")',
        'companyName': '海尔云贷',
        'creditLimitReleaseMode': '@pick(["1", "2", "3", "4"])',
        'creditAuditDTO|5': [
          {
            'operUserName': '@name',
            'auditStatus': '@pick(["1", "2", "3", "4"])',
            'operUserCode': '123',
            'operTime': '@date("yyyy-mm-dd")',
            'opinion': '@character' // 意见信息
          }
        ],
        'creditApplyNo': '@integer(10)',
        'creditStatus': '@pick(["1", "2", "3", "4"])',
        'surplusCountLimit': '2000000',
        'quarterSurplusCountLimit': '100000',
        'countLimit': '100000',
        'creditCode': '@integer(10)',
        'companyNo': '1234567890',
        'monthCountLimit': '50000',
        'firstTrialDTOList|10': [
          {
            'itemName': '@name',
            'fileName': '@name',
            'description': '',
            'fileUrl': '@url("http")'
          }
        ],
        'monthSurplusCountLimit': '10000',
        'startDate': '@date("yyyy-mm-dd")',
        'quarterCountLimit': '123123'
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
