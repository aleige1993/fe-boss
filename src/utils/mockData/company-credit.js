import Mock from 'mockjs';
export default [
  // 授信列表
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
            'singleLimitAmt': '1212',
            'handleUserName': '张三',
            'endDate': '@date("yyyy-MM-dd")',
            'creditLimitReleaseMode': '@pick(["1", "2", "3"])',
            'creditLimitNo': '124515',
            'creditStatus': '@pick(["1", "2", "3", "4", "5", "6", "7", "9"])',
            'surplusCountLimit': '1',
            'quarterSurplusCountLimit': '1',
            'creditCode': '@integer(10)',
            'monthCountLimit': '2121',
            'handleUserCode': '1212',
            'tacheName': '@name',
            'monthSurplusCountLimit': '1',
            'startDate': '@date("yyyy-MM-dd")',
            'quarterCountLimit': '2',
            // add
            'corpName': '@name',
            'currentLimitAmt': '123456',
            'totalLimitAmt': '123456',
            'corpNo': '@integer(10)',
            'taskName': '@name',
            'taskArriveTime': '@date("yyyy-MM-dd")' // 任务送达时间
          }
        ],
        'totalNum': 100
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 授信详情查询
  {
    url: '/credit/find', // creditApplyNo
    on: true,
    resp: Mock.mock({
      'body': {
        'singleLimitAmt': '121212',
        'externalAuditDTOList|5': [
          {
            'itemName': '@name',
            'fileName': '@name',
            'description': '大萨达撒大萨达撒大所多撒如法网二号地方不规范性',
            'fileUrl': '@url("http")'
          }
        ],
        'endDate': '@date("yyyy-mm-dd")',
        'corpName': '阿里巴巴',
        'creditLimitReleaseMode': '@pick(["1", "2", "3"])',
        'creditLimitNo': '123',
        'creditStatus': '@pick(["1", "2", "3"])',
        'currentLimitAmt': '123123',
        'totalLimitAmt': '123123',
        'creditCode': '123123',
        'corpNo': '@integer(12)',
        'firstTrialDTO': {
          'creditCheckItemsList': {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          },
          'netApprove': '',
          'telephoneApprove': ''
        },
        'startDate': '@date("yyyy-mm-dd")',
        'creditApplyAttachList': [
          {
            'attachName': '@name',
            'attachUrl': '@url("http")',
            'attachSuffixType': '@pick(["png", "jpg", "gif"])'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 授信历史
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
  },
  // 授信申请
  {
    url: '/credit/apply',
    on: true,
    resp: {
      'body': {},
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  },
  // 授信修改
  {
    url: '/credit/update',
    on: true,
    resp: {
      'body': {},
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  }
];
