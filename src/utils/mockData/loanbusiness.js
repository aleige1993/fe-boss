import Mock from 'mockjs';

export default [
  // 个人业务登记-个人信息-车辆列表
  {
    url: '/loanCarList',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 999999,
        'resultList|3': [
          {
            'obligeeType|1': ['1', '2'],
            'obligeeNo|5000-10000': 5000,
            'obligeeName': '@name',
            'carModel': 'CS75',
            'carNo': /渝[0-9A-Z]{5}/,
            'engineNo': /[A-Z0-9]{18}/,
            'carFrameNo': /[A-Z0-9]{18}/,
            'carMoney|168000-300000': 168000
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 个人业务登记-个人信息-担保人信息
  {
    url: '/loanAssureList',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 999999,
        'resultList|3': [
          {
            'assureType|1': ['1', '2'],
            'assureNo|5000-10000': 5000,
            'assureName': '@name',
            'assureMode|1': ['1', '2'],
            'obligorNexus|1': ['1', '2']
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
