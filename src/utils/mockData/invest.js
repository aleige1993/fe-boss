import Mock from 'mockjs';
export default [
  // 资方管理
  {
    url: '/maintain',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'totalNum': 100,
        'resultList|10': [
          {
            'id|+1': 1,
            'name|1': ['海尔云贷', '马云', '王健林'],
            'state|1': ['正常', '不正常']
          }
        ]
      },
      reCode: '0',
      reMsg: 'success'
    })
  },
  // 资方管理 - 新增弹窗 - 合同协议
  {
    url: '/agreement',
    on: true,
    resp: Mock.mock({
      'list|10': [
        {
          'id|+1': 1,
          'name|1': ['协议名称01', '协议名称02', '协议名称03'],
          'enclosure|1': ['001.jpg', '002.jpg', '003.jpg']
        }
      ],
      reCode: '0',
      reMsg: 'success'
    })
  },
  // 资方管理 - 资方映射配置
  {
    url: '/mapping',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'totalNum': 100,
        'resultList|10': [
          {
            'proNumber|1': ['产品编号01', '产品编号02', '产品编号03'],
            'proName|1': ['欢乐颂', '任分期'],
            'investName|1': ['海尔云贷', '海乐行融资租赁'],
            'investProNumber|1': ['资方产品编号01', '资方产品编号02', '资方产品编号03'],
            'channelNumber|1': ['渠道编号01', '渠道编号02', '渠道编号03'],
            'managerNumber|1': ['客户经理编号01', '客户经理编号02', '客户经理编号03']
          }
        ]
      },
      reCode: '0',
      reMsg: 'success'
    })
  },
  // 资方管理 - 合同模板维护
  {
    url: '/contract',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'totalNum': 100,
        'resultList|10': [
          {
            'id|+1': 1,
            'name|1': ['海尔云贷贷款合同', '@name'],
            'type|1': ['贷款合同01', '贷款合同02', '贷款合同03'],
            'enclosure': /[a-z][A-Z][0-9]{3}\.pdf/,
            'SignId': /[A-Z]{2}[0-9]{9}/
          }
        ]
      },
      reCode: '0',
      reMsg: 'success'
    })
  }
];
