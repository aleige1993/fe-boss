import Mock from 'mockjs';
import companyCustomerBasicData from '@/components/form-company-customer-basic/mixin-data';
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
              'memberNo': 383609955686547422,
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
  // 企业客户列表
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
              'bizProvinceCode': '1',
              'bizCityCode': '1',
              'bizDistrictCode': '1',
              'bizRoadAddr': '@county(true)',
              'mainLinkmanName': '@name',
              'actualControllersTel': '2123',
              'joinStartDate': '2017-12-12',
              'about': '321321',
              'isMerchant': '21',
              'legalPersonMobile': '2121',
              'isPermanentlyValid': '1',
              'regRoadAddr': '1',
              'regProvinceName': '1',
              'legalPersonNo': '1',
              'legalPersonStock': '1',
              'modifiedUserCode': '1',
              'mainLinkmanNo': '1',
              'fax': '1',
              'bizProvinceName': 'aa',
              'mainLinkmanSex': '1',
              'mainLinkmanPhone': '1',
              'bizCityName': '1aaa',
              'mainLinkmanEmail': '1',
              'legalPersonSex': '1',
              'actualControllers': '1',
              'regCityName': '1',
              'gmtModified': '1',
              'bizExpDate': '1',
              'custMgrName': '1',
              'custMgrNo': '1',
              'serialVersionUID': '1',
              'mainLinkmanDuty': '1',
              'legalPersonCertno': '1',
              'bizDepartmentCode': '1',
              'regCityCode': '1',
              'regDistrictCode': '1',
              'website': '1',
              'regProvinceCode': '1',
              'createUserCode': '1',
              'gmtCreate': '1',
              'mainLinkmanCertno': '1',
              'legalPersonCerttype': '1',
              'regDistrictName': '1',
              'bizDistrictName': '1dsss',
              'bizDepartmentName': '1'
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
    url: '/corp/saveCorp',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        corpNo: '1',
        corpName: '海尔云贷',
        status: '1'
      }
    }
  },
  // 企业客户股东信息
  {
    url: '/corp/listCorpPartner',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      body: {
        'resultList|10': [
          {
            partnerName: '@name',
            partnerType: '1',
            investAmt: '10000',
            investType: '1',
            investPercent: '60',
            remark: '1111',
            partnerNo: '1'
          }
        ]
      }
    })
  },
  // 企业客户股东信息--保存
  {
    url: '/corp/savePartner',
    on: true,
    resp: {
      success: true,
      reCode: '0000',
      body: {}
    }
  },
  // 企业客户股东信息--删除
  {
    url: '/corp/deleteCorpPartner',
    on: true,
    resp: {
      success: true,
      reCode: '0000',
      body: {}
    }
  },
  {
    url: '/corp/getCorpDetail',
    on: true,
    resp: Mock.mock({
      success: true,
      reCode: '0000',
      body: $.extend(companyCustomerBasicData.data.formDataInit, {
        baseDTO: {
          'corpNo': '386118080880705536',
          'corpName': '海尔云贷编辑测试',
          'creditCode': '123456',
          'mainLinkmanName': '张三',
          'actualControllersTel': '121212',
          'joinStartDate': '2017-12-12',
          'bizRoadAddr': '重庆市云阳县',
          'about': '都是工时费发生大大声规范十大歌手胜多负少的',
          'isMerchant': '1',
          'legalPersonMobile': '123123',
          'isPermanentlyValid': '1',
          'regRoadAddr': '复方丹参防守打法的是',
          'regProvinceName': '1',
          'legalPersonNo': '22222',
          'legalPersonStock': '2',
          'mainLinkmanNo': '11111',
          'fax': '11111111',
          'bizProvinceName': '但是',
          'mainLinkmanSex': '1',
          'mainLinkmanPhone': '111111111',
          'telephone': '111111',
          'bizCityName': '1',
          'mainLinkmanEmail': '1',
          'legalPersonSex': '1',
          'actualControllers': '发多少',
          'regCityName': '都是工时费发生大大声规范十大歌手胜多负少的',
          'regCapital': '都是工时费发生大大声规范十大歌手胜多负少的',
          'bizExpDate': '2017-1-1',
          'bizDistrictCode': '1',
          'corpType': '1',
          'custMgrName': '刚发的',
          'regDate': '2017-1-1',
          // 'corpNo': '',
          'bizCityCode': '1111111',
          'custMgrNo': '11111111',
          'mainLinkmanDuty': '1',
          'industryType': '1',
          'legalPersonCertno': '111111',
          'legalPerson': '的是非得失',
          'bizDepartmentCode': '1',
          'regCityCode': '1',
          'regDistrictCode': '1',
          'website': 'vdfgsfds',
          'regProvinceCode': '1',
          'mainLinkmanCertno': '1',
          'legalPersonCerttype': '1',
          'regDistrictName': '好几个',
          'bizDistrictName': '发生的',
          'bizProvinceCode': '1',
          'bizDepartmentName': '似懂非懂是'
        }
      })
    })
  },
  // 企业客户银行账户信息
  {
    url: '/corp/listCorpAcct',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      body: {
        'resultList|10': [{
          'corpNo': '12',
          'corpName': '@name',
          'acctName': '@name',
          'acctNo': '12',
          'bankName': '@name',
          'openBankName': '@name',
          'openBankNo': '12',
          'openBankClearingNo': '12',
          'remark': 'dasdasdsa'
        }]
      }
    })
  },
  {
    url: '/corp/saveCorpAcct',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      body: {}
    })
  },
  {
    url: '/corp/deleteCorpAcct',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      body: {}
    })
  },
  // 企业客户关联企业
  {
    url: '/corp/listCorpRelationShip',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: Mock.mock({
        'resultList|5-20': [
          {
            'corpNo': '1',
            'corpName': '海尔云贷',
            'relatedCorpNo': '2',
            'relatedCorpName': '海尔集团',
            'relatedCorpCreditCode': '123',
            'relation': '1',
            'linkmanName': '打算',
            'linkmanMobile': '123',
            'regDate': '2017-11-11',
            'regCapital': '1',
            'bizAddress': '大萨达撒多撒多',
            'remark': '大萨达撒大所多'
          }
        ]
      })
    }
  },
  {
    url: '/corp/saveCorpRelationShip',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {}
    }
  },
  {
    url: '/corp/deleteCorpRelationShip',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {}
    }
  },
  // 企业客户--业务往来
  {
    url: '/corp/listCorpBiz',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: Mock.mock({
        'resultList|10': [
          {
            corpNo: '@integer(11)',
            corpName: '@name',
            orderNo: '@integer(11)',
            orderAmt: 500,
            startDate: '2017-12-12',
            endDate: '2017-14-10',
            capitalOverdateAmt: 500,
            rateOverdateAmt: 500,
            status: '1'
          }
        ]
      })
    }
  },
  // 企业客户--第三方凭证
  {
    url: '/corp/listCorpPawn',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: Mock.mock({
        'resultList|10': [
          {
            corpNo: '@integer(11)',
            corpName: '@name',
            orderNo: '@integer(11)',
            orderAmt: 500,
            guaranteeType: '1',
            pawnType: '1',
            finalEstimate: '2000',
            regDate: '2014-15-15',
            pawnName: '@name',
            status: '1'
          }
        ]
      })
    }
  },
  // 企业客户--诉讼信息
  {
    url: '/corp/listCorpLawcase',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: Mock.mock({
        'resultList|10': [
          {
            corpNo: '@integer(11)',
            corpName: '@name',
            lawCaseNo: '@integer(11)',
            lawCaseDate: '2014-15-15',
            lawCaseCause: '1',
            lawCaseAmt: '1',
            lawCaseRole: '2000',
            createUserCode: '1',
            gmtCreate: '2014-15-15'
          }
        ]
      })
    }
  },
  // 企业客户--诉讼信息保存 corp/deleteCorpLawcase
  {
    url: '/corp/saveCorpLawcase',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {}
    }
  },
  {
    url: '/corp/deleteCorpLawcase',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {}
    }
  },
  // 根据id查询个人客户的银行账户信息
  {
    url: '/member/account/query',
    on: true,
    resp: Mock.mock({
      'body|10': [
        {
          'bankCode': '1',
          'gmtModified': '@date',
          'bankCardNo': '@integer(10)',
          'createUserCode': '',
          'bankCardType': '',
          'bankMobile': '@integer(11)',
          'bankName': '@name',
          'openBankCode': '@integer(5)',
          'remark': '@name',
          'gmtCreate': '@date',
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
  {
    url: '/member/account/delete',
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
  },
  // 旗下公司
  {
    url: '/member/have/company/list',
    on: true,
    resp: Mock.mock(
      {
        'body|10': [
          {
            'companyCode': '123456',
            'gmtModified': '@date',
            'regCapital': '21',
            'companyName': '@name',
            'createUserCode': '213',
            'regDate': '@date',
            'gmtCreate': '@date',
            'memberNo': '1234567891234',
            'suCreditCode': '12321312',
            'contactUserPhone': '312312312',
            'modifiedUserCode': '32132',
            'id': '21',
            'contactUser': '321321',
            'relative': '3'
          }
        ],
        'reCode': '0000',
        'reMsg': '成功',
        'success': false
      }
    )
  },
  // 旗下公司 == 保存
  {
    url: '/member/have/company/save',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {}
    }
  },
  // 旗下公司 == 删除
  {
    url: '/member/have/company/delete',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {}
    }
  },
  // 负面调查
  {
    url: '/member/negative/examine/list',
    on: true,
    resp: Mock.mock(
      {
        'body|10': [
          {
            'memberNo': '@integer(10)',
            'gmtModified': '2017-10-12',
            'examineReason': '大四的撒大所多撒所',
            'inputUserCode': '12',
            'examineDate': '12',
            'createUserCode': '12',
            'modifiedUserCode': '12',
            'inputTime': '2017-10-12',
            'id': '1',
            'gmtCreate': '2017-10-12'
          }
        ],
        'reCode': '0000',
        'reMsg': '成功',
        'success': true
      }
    )
  },
  {
    url: '/member/negative/examine/insert',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {}
    }
  },
  // 附件信息
  {
    url: '/corp/listCorpAttach',
    on: true,
    resp: {
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      body: {
        resultList: [
          {
            'attachUrl': 'www.baidu.cim',
            'attachName': '脱衣舞视频',
            'attachSuffixType': ''
          }
        ]
      }
    }
  }
];
