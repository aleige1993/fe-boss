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
  {
    url: '/member/delete',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  {
    url: '/member/change/status',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
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
              'status': '@pick(["1", "2", "3"])',
              'corpType': '1',
              'industryType': '1',
              bizProvinceCode: '1',
              bizCityCode: '1',
              bizDistrictCode: '1',
              bizRoadAddr: '@county(true)'
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
  // 添加会员银行卡
  {
    url: '/member/account/insert',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  // 编辑会员银行卡
  {
    url: '/member/account/update',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  // 根据id查询个人客户
  {
    url: '/member/find',
    on: true,
    resp: {
      'body': {
        'mbMemberDTO': {
          'birthday': '2016-01-12',
          'certType': '1',
          'liveYears': '4',
          'gmtModified': '2017-01-12',
          'education': '1',
          'nowCityName': '1',
          'joinStartDate': '1',
          'liveType': '1',
          'custMgrName': '1',
          'censusCityName': '1',
          'censusDistrictCode': '1',
          'custMgrNo': '1',
          'certHandUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511446310921&di=7872eeb7a170f7bb12137f2561' +
          'c07951&imgtype=0&src=http%3A%2F%2Fwww.6681.com%2Fuploads%2Fallimg%2F160114%2F38-160114101619-52.jpg',
          'isNative': '1',
          'censusProvinceName': '1',
          'censusDistrictName': '1',
          'nowProvinceName': '1',
          'bizDepartmentCode': '1',
          'modifiedUserCode': '1',
          'certValidDate': '1',
          'certFrontUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511446310921&di=7872eeb7a170f7bb12137f2561' +
          'c07951&imgtype=0&src=http%3A%2F%2Fwww.6681.com%2Fuploads%2Fallimg%2F160114%2F38-160114101619-52.jpg',
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
          'certBackUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511446310921&di=7872eeb7a170f7bb12137f2561' +
          'c07951&imgtype=0&src=http%3A%2F%2Fwww.6681.com%2Fuploads%2Fallimg%2F160114%2F38-160114101619-52.jpg',
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
    url: '/member/save',
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
  // 删除配偶
  {
    url: '/member/spo/delete',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功了',
      'success': true,
      body: {}
    }
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
  },
  // 联系人信心
  {
    url: '/member/ohter/contacts/query',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body|10': [
        {
          'memberNo': '@integer(10)',
          'gmtModified': '2011-12-12',
          'createUserCode': '@integer(5)',
          'modifiedUserCode': '@integer(5)',
          'contactType': '@pick(["2", "1", "3"])',
          'id': '@integer(4)',
          'gmtCreate': '2011-12-12',
          'contactsName': '@name',
          'relative': '@pick(["2", "1", "3"])',
          'contactsMobile': '@integer(11)'
        }
      ]
    })
  },
  // 联系人新增
  {
    url: '/member/ohter/contacts/insert',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  // 联系人修改
  {
    url: '/member/ohter/contacts/update',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  // 联系人删除
  {
    url: '/member/ohter/contacts/delete',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {}
    }
  },
  // 电话本
  {
    url: '/member/telephone/page',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {
        'resultList|10': [
          {
            'memberNo': '@integer(10)',
            'gmtModified': '2011-12-12',
            'createUserCode': '@integer(5)',
            'modifiedUserCode': '@integer(5)',
            'contactType': '@pick(["2", "1", "3"])',
            'id': '@integer(4)',
            'gmtCreate': '2011-12-12',
            'contactsName': '@name',
            'relative': '@pick(["2", "1", "3"])',
            'contactsEmail': '@email',
            'contactsPhone': '@integer(11)',
            'contactsRemark': 'asdasdas',
            'contactsAddr': '@county(true)'
          }
        ],
        currentPage: 1,
        totalNum: 50
      }
    })
  },
  // 呼入
  {
    url: '/member/call/in/page',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {
        'resultList|10': [
          {
            'memberNo': '@integer',
            'contactsPhone': '@integer(10)',
            'gmtModified': '2011-11-11',
            'serialVersionUID': 1,
            'createUserCode': '@integer(11)',
            'callCount': '200',
            'modifiedUserCode': '',
            'id': '@integer(5)',
            'gmtCreate': '2011-11-11',
            'contactsName': '@name',
            'callTime': '2011-11-11'
          }
        ],
        currentPage: 1,
        totalNum: 50
      }
    })
  },
  // 呼出
  {
    url: '/member/call/out/page',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body': {
        'resultList|10': [
          {
            'memberNo': '@integer',
            'contactsPhone': '@integer(10)',
            'gmtModified': '2011-11-11',
            'serialVersionUID': 1,
            'createUserCode': '@integer(11)',
            'callCount': '200',
            'modifiedUserCode': '',
            'id': '@integer(5)',
            'gmtCreate': '2011-11-11',
            'contactsName': '@name',
            'callTime': '2011-11-11'
          }
        ],
        currentPage: 1,
        totalNum: 50
      }
    })
  }
];
