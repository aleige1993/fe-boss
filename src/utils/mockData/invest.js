import Mock from 'mockjs';

export default [
  // 资方管理
  {
    url: '/pms/capital/accBaseInfoList',
    type: 'get',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 5,
        'resultList|15': [
          {
            'acctName': '@name',
            'acctNo': '55555',
            'bizCityCode': '111',
            'bizCityName': '@city',
            'bizDistrictCode': 'bizDistrictCode',
            'bizDistrictName': '@county',
            'bizProvinceCode': 'bizProvinceCode',
            'bizProvinceName': '@province',
            'bizRoadAddr': 'bizRoadAddr',
            'capitalName': '@name',
            'capitalNo|+1': 38615,
            'creditCode': '44444',
            'email': '@email',
            'gmtCreate': '2017-12-01 14:12:20',
            'gmtModified': '2017-12-01 14:12:20',
            'id': 2,
            'legalCertno': 'legalCertno',
            'legalPerson': 'legalPerson',
            'linkmanMobile': '22222',
            'linkmanName': 'linkmanName',
            'openbankname': 'openbankname',
            'regDate': '2017-11-11',
            'status|1': ['1', '2']
          }
        ],
        'startIndex': 0,
        'totalNum': 15,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
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
      reCode: '0000',
      reMsg: '成功'
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
      reCode: '0000',
      reMsg: '成功'
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
      reCode: '0000',
      reMsg: '成功'
    })
  }
];
