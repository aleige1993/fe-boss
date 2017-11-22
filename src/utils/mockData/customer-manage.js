import Mock from 'mockjs';
export default [
  {
    url: '/member/blacklist/list',
    on: true,
    resp: Mock.mock({
      'body|10': [
        {
          'blacklistReason': '逾期1',
          'blacklistStatus': '2',
          'blacklistTime': '2017-11-20 15:11:45',
          'certNo': '500254187512548569',
          'companyCode': '500000',
          'companyName': '重庆',
          'createUserCode': 'ADMIN',
          'gmtCreate': '2017-11-20 15:11:59',
          'gmtModified': '2017-11-20 15:12:03',
          'id': 1,
          'memberNo': 382184454254231626,
          'mobile': '18000000000',
          'modifiedUserCode': 'ADMIN',
          'name': '@name'
        }
      ],
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/member/page',
    on: true,
    resp: Mock.mock(
      {
        'body': {
          'currentPage': 1,
          'isMore': 0,
          'pageSize': 15,
          'resultList|10': [
            {
              'certNo': '@Integer(18)',
              'certType': '@pick(["1", "2"])',
              'memberNo': '@Integer(5)',
              'mobile': '@Integer(10)',
              'name': '@name',
              'sex': '@pick(["1", "2"])',
              'status': '@pick(["1", "2", "3"])'
            }
          ],
          'startIndex': 0,
          'totalNum': 100,
          'totalPage': 1
        },
        'reCode': '0000',
        'reMsg': '成功',
        'success': true
      }
    )
  },
  {
    url: '/corp/listCorp',
    on: true,
    resp: Mock.mock(
      {
        'body': {
          'currentPage': 1,
          'isMore': 0,
          'pageSize': 15,
          'resultList|10': [
            {
              'corpNo': '@Integer(18)',
              'corpName': '@name',
              'creditCode': '@Integer(5)',
              'legalPerson': '@name',
              'regDate': '@date',
              'regCapital': '@double(10)',
              'telephone': '@integer(11)',
              'status': '@pick(["1", "2", "3"])'
            }
          ],
          'startIndex': 0,
          'totalNum': 100,
          'totalPage': 1
        },
        'reCode': '0000',
        'reMsg': '成功',
        'success': true
      }
    )
  }
];
