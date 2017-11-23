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
              'regCapital': '@float(10, 100000)',
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
  },
  {
    url: '/member/account/query',
    on: true,
    resp: Mock.mock({
      'body|10': [
        {
          'bankCode': '@integer(10)',
          'gmtModified': '@date',
          'bankCardNo': '@integer(10)',
          'createUserCode': '',
          'bankCardType': '',
          'bankMobile': '',
          'bankName': '@name',
          'openBankCode': '@integer(5)',
          'remark': '',
          'gmtCreate': '',
          'openBankName': '@name',
          'memberNo': '',
          'certNo': '',
          'name': '@name',
          'modifiedUserCode': '',
          'id': ''
        }
      ],
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  {
    url: '/member/find',
    on: true,
    resp: {
      'body': {
        'mbMemberDTO': {
          'birthday': '2017-12-12',
          'certType': '1',
          'liveYears': '4',
          'gmtModified': '2017-12-12',
          'education': '1',
          'nowCityName': '1',
          'joinStartDate': '1',
          'liveType': '1',
          'custMgrName': '1',
          'censusCityName': '1',
          'censusDistrictCode': '1',
          'custMgrNo': '1',
          'certHandUrl': '1',
          'isNative': '1',
          'censusProvinceName': '1',
          'censusDistrictName': '1',
          'nowProvinceName': '1',
          'bizDepartmentCode': '1',
          'modifiedUserCode': '1',
          'certValidDate': '1',
          'certFrontUrl': '1',
          'workYears': '1',
          'nowRoadAddr': '1',
          'isLocalHouse': '1',
          'censusRoadAddr': '1',
          'sex': '1',
          'createUserCode': '1',
          'mobile': '1',
          'nowCityCode': '1',
          'nowDistrictName': '1',
          'gmtCreate': '1',
          'censusProvinceCode': '1',
          'nowDistrictCode': '1',
          'memberNo': '1',
          'certNo': '1',
          'censusCityCode': '1',
          'nowProvinceCode': '1',
          'certBackUrl': '1',
          'name': '11',
          'workType': '1',
          'maritalStatus': '1',
          'annualRevenue': '1',
          'bizDepartmentName': '1',
          'status': '1'
        },
        'mbMemberWorkDTO': {
          'gmtModified': '1',
          'districtCode': '1',
          'cityCode': '1',
          'companyName': '1',
          'roadAddr': '1',
          'unitType': '1',
          'joinDate': '1',
          'industryType': '1',
          'cityName': '1',
          'modifiedUserCode': '1',
          'department': '1',
          'companyCode': '1',
          'monthRevenue': '1',
          'districtName': '1',
          'provinceCode': '1',
          'companyTel': '1',
          'createUserCode': '1',
          'gmtCreate': '1',
          'duty': '1',
          'provinceName': '1'
        }
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  }
];
