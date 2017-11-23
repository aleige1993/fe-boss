import Mock from 'mockjs';
export default [
  // 黑名单列表
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
  // 分页查询个人客户
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
  //
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
  // 根据id查询个人客户的银行账户信息
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
  // 根据id查询个人客户
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
          'certHandUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511441518597&di=45e14b60c976ae013cc75ee3598f4b22&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2015%2F216%2F18%2F6XNFV7K4F34R.jpg',
          'isNative': '1',
          'censusProvinceName': '1',
          'censusDistrictName': '1',
          'nowProvinceName': '1',
          'bizDepartmentCode': '1',
          'modifiedUserCode': '1',
          'certValidDate': '1',
          'certFrontUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511441518597&di=45e14b60c976ae013cc75ee3598f4b22&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2015%2F216%2F18%2F6XNFV7K4F34R.jpg',
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
          'certBackUrl': 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/72f082025aafa40f12647690a064034f79f019d8.jpg',
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
  },
  // 保存个人客户
  {
    url: '/member/account/insert',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {
        mbMemberDTO: {
          'memberNo': '123456',
          'certNo': '123456',
          'name': '龚明华',
          'mobile': '15696544221',
          'workType': '1',
          'maritalStatus': '1',
          'status': '1'
        }
      }
    }
  },
  // 配偶列表
  {
    url: '/member/spo/query',
    on: true,
    resp: Mock.mock({
      'body|4': [
        {
          'companyCode': '@integer(5)',
          'certNo': '@integer(5)',
          'certType': '@pick(["1", "2"])',
          'spoMemberNo': '@integer(5)',
          'education': '@pick(["1", "2"])',
          'companyName': '@name',
          'name': '@name',
          'mobile': '110',
          'marriageStatus': '@pick(["1", "2", "3"])'
        }
      ],
      'reCode': '0000',
      'reMsg': '成功了',
      'success': true
    })
  },
  // 添加配偶
  {
    url: '/member/spo/save',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {}
    }
  }
];
