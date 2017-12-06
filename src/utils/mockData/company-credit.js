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
            'description': '@string(50)',
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
        firstTrialDTO: {
          'netApprove': '@string(50)',
          'telephoneApprove': '@string(50)',
          'creditCheckItemsList|4': [
            {
              'itemName': '@name',
              'fileName': '@name',
              'description': '@string(50)',
              'fileUrl': '@url("http")'
            }
          ]
        },
        'creditApplyAttachList|5': [{
          attachName: '@name',
          attachUrl: '@url("http")',
          attachSuffixType: '@pick("jpg", "png", "zip")'
        }],
        'monthSurplusCountLimit': '10000',
        'startDate': '@date("yyyy-mm-dd")',
        'quarterCountLimit': '123123'
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/credit/listAuditLog',
    on: true,
    resp: Mock.mock({
      'body|10': [
        {
          'timeConsuming': '@integer(4)',
          'handleTime': '@date("yyyy-mm-dd")',
          'tacheCode': '@integer(5)',
          'handleUserName': '@name',
          'companyName': '阿里巴巴',
          'creditApplyNo': '@integer(5)',
          'opinion': '@integer(5)',
          'creditCode': '@integer(5)',
          'companyNo': '@integer(5)',
          'handleUserCode': '@integer(5)',
          'tacheName': '@string(20)', // 环节名称
          'auditStatus': '@pick(["1", "2", "3", "4"])',
          'startTime': '@date("yyyy-mm-dd")',
          'id': '@integer(5)',
          'endTime': '@date("yyyy-mm-dd")'
        }
      ],
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/credit/delete',
    on: true,
    resp: {
      'body': {},
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  }
];
