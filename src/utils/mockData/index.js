import Mock from 'mockjs';
import menuList from './menuList';
import product from './product';
import invest from './invest';
import customerManage from './customer-manage';
import employerManage from './employer-manage';
import enumSelectData from './enum-select-data';
import department from './department';
import companyCredit from './company-credit';
import loanbusiness from './loanbusiness';
import carDropList from './car-droplist';
import distributor from './distributor';
import repment from './repment';

let ary = [
  {
    url: '/login',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        token: 'XCSDCSXSDSDS',
        username: 'xiaoming',
        userId: 123
      },
      reMsg: 'success'
    }
  },
  // 文件上传
  {
    url: '/common/upload',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        'fileName': '照片',
        'fileSize': 100,
        'suffix': 'jpg',
        'url': 'http://www.sinaimg.cn/qc/autoimg/car/30/34/129863430_950.jpg'
      },
      reMsg: 'success'
    }
  },
  // 地址获取
  {
    url: '/common/region/list',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      'body': [
        {
          regionCode: '1',
          regionName: '@province'
        },
        {
          regionCode: '2',
          regionName: '@province'
        },
        {
          regionCode: '3',
          regionName: '@province'
        }
      ]
    })
  },
  // 银行下拉
  {
    url: '/common/support/bank/list',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      'body|10': [
        {
          bankCode: '1',
          bankName: '@name'
        }
      ]
    })
  },

  // 财务管理
  {
    url: '/pay/payment',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 10,
        'resultList': [
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '11111111',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '12321423433221321432',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '-1'
          },
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '222222222',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '12321423433221321432',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '0'
          },
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '3333333',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '12321423433221321432',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '1'
          },
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '44444444444',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '4444444',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '-1'
          },
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '5555555555',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '12321423433221321432',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '2'
          },
          {
            'actualTime': '2018-01-03',
            'expectTime': '2018-01-03',
            'payForNo': '66666666666666',
            'toAccDept': '渝中支行',
            'toAccName': '张三',
            'toAccNo': '12321423433221321432',
            'toBankName': '中国工商银行',
            'toCityName': '重庆',
            'toProName': '重庆',
            'transBatchid': '4545121212',
            'transCardId': '504545487514512454121',
            'transEndtime': '2018-01-03',
            'transFee': '20',
            'transMobile': '13112341234',
            'transMoney': '1000',
            'transNo': '1312312314512',
            'transOrderid': '4545454574',
            'transRemark': 'success',
            'transSummary': '上次出差',
            'state': '3'
          }
        ],
        'startIndex': 0,
        'totalNum': 1,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功:',
      'success': true
    })
  },
  {
    url: '/pay/apply/payment',
    on: true,
    resp: Mock.mock({
      'messageBody': {
      },
      'messageFault': {
        'reCode': '0000',
        'reMsg': '成功:null'
      }
    })
  },
  {
    url: '/pay/receive',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 10,
        'resultList': [
          {
            'accNo': '62487158124887000148121',
            'additionalInfo': '备注',
            'alidDate': '2812',
            'bankName': '中国工商银行',
            'batchId': '47542124545451',
            'createUserCode': '785423',
            'gmtCreate': 1515054288000,
            'gmtModified': 1515054294000,
            'idCard': '500548785454215421',
            'idCardType': '01',
            'idHolder': '张三',
            'mobile': '13145484548',
            'modifiedUserCode': '52454622',
            'orderStat': 'D',
            'payCode': '787454',
            'projectNo': '2343242356789',
            'receiveNo': '2342342342342342',
            'receiveTime': 1514995200000,
            'reqReserved': '备注',
            'succAmt': 200000,
            'tradeDate': '2018-01-04 16:23:55',
            'transBatchId': '85412852',
            'transId': '784454545121',
            'transNo': '478751212454512',
            'transSerialNo': '784548412482215785',
            'txnAmt': 200000,
            'validNo': '254',
            'succTime': 1514995200000
          }
        ],
        'startIndex': 0,
        'totalNum': 1,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功:',
      'success': true
    })
  },
  // banner 管理
  {
    url: '/cfg/banner/list',
    on: true,
    resp: Mock.mock({
      'reCode': 'str',
      'reMsg': 'str',
      'success': true,
      'body': {
        'currentPage': 0,
        'pageSize': 0,
        'totalNum': 0,
        'isMore': 0,
        'totalPage': 0,
        'startIndex': 0,
        'resultList': [
          {
            'id': '0',
            'title': 'banner1',
            'bannerUrl': '',
            'linkUrl': 'https://image.baidu.com/search/',
            'index': '0',
            'activeStatus': '0',
            'createUserCode': '',
            'modifiedUserCode': '',
            'gmtCreate': 1515139533309,
            'gmtModified': 1515139533309
          },
          {
            'id': '0',
            'title': 'banner1',
            'bannerUrl': '',
            'linkUrl': 'https://image.baidu.com/search/',
            'index': '0',
            'activeStatus': '1',
            'createUserCode': '',
            'modifiedUserCode': '',
            'gmtCreate': 1515139533309,
            'gmtModified': 1515139533309
          }
        ]
      }
    })
  },

  // 车型管理 - 品牌管理
  {
    url: '/ces/brand/page',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 1,
        'pageSize': 10,
        'resultList': [
          {
            'brandName': '奥迪',
            'brandNo': '390819145165307904',
            'id': 7,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/1.png'
          },
          {
            'brandName': '阿斯顿·马丁',
            'brandNo': '390819145588932608',
            'id': 8,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/2.png'
          },
          {
            'brandName': '阿尔法·罗密欧',
            'brandNo': '390819146008363008',
            'id': 9,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/3.png'
          },
          {
            'brandName': 'AC Schnitzer',
            'brandNo': '390819146427793408',
            'id': 10,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/4.png'
          },
          {
            'brandName': 'ALPINA',
            'brandNo': '390819146851418112',
            'id': 11,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/33702.png'
          },
          {
            'brandName': 'ARCFOX',
            'brandNo': '390819147270848512',
            'id': 12,
            'initial': 'A',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/41347.png'
          },
          {
            'brandName': '安凯客车',
            'brandNo': '390819147694473216',
            'id': 13,
            'initial': 'A'
          },
          {
            'brandName': '本田',
            'brandNo': '390819148113903616',
            'id': 14,
            'initial': 'B',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/7.png'
          },
          {
            'brandName': '别克',
            'brandNo': '390819148537528320',
            'id': 15,
            'initial': 'B',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/8.png'
          },
          {
            'brandName': '宝马',
            'brandNo': '390819148956958720',
            'id': 16,
            'initial': 'B',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/10.png'
          }
        ],
        'startIndex': 0,
        'totalNum': 188,
        'totalPage': 19
      },
      'reCode': '0000',
      'reMsg': '成功:',
      'success': true
    })
  },
  {
    url: '/recomm/brand/page',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 10,
        'resultList': [
          {
            'brandName': '阿尔法·罗密欧',
            'brandNo': '390819146008363008',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/3.png',
            'recommNo': '390820560625467392',
            'recommOrder': 1
          },
          {
            'brandName': '奥迪',
            'brandNo': '390819145165307904',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/1.png',
            'recommNo': '390819145165307904',
            'recommOrder': 7
          },
          {
            'brandName': '阿斯顿·马丁',
            'brandNo': '390819145588932608',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/2.png',
            'recommNo': '390819145588932608',
            'recommOrder': 8
          },
          {
            'brandName': '北京',
            'brandNo': '390819152744415232',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/18.png',
            'recommNo': '390819152744415232',
            'recommOrder': 25
          },
          {
            'brandName': '东风风神',
            'brandNo': '390819161174966272',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/38.png',
            'recommNo': '390819161174966272',
            'recommOrder': 45
          },
          {
            'brandName': '福特',
            'brandNo': '390819165809672192',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/52.png',
            'recommNo': '390819165809672192',
            'recommOrder': 56
          },
          {
            'brandName': '海马',
            'brandNo': '390819171287433216',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/72.png',
            'recommNo': '390819171287433216',
            'recommOrder': 69
          },
          {
            'brandName': '恒天',
            'brandNo': '390819175074889728',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/84.png',
            'recommNo': '390819175074889728',
            'recommOrder': 78
          },
          {
            'brandName': '凯迪拉克',
            'brandNo': '390819182653997056',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/102.png',
            'recommNo': '390819182653997056',
            'recommOrder': 96
          },
          {
            'brandName': '领克',
            'brandNo': '390819193609519104',
            'logo': 'http://pic1.jisuapi.cn/car/static/images/logo/300/41.png',
            'recommNo': '390819193609519104',
            'recommOrder': 122
          }
        ],
        'startIndex': 0,
        'totalNum': 10,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功:success',
      'success': true
    })
  },
  // 车型管理 - 车型管理
  {
    url: '/ces/model/page',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 1,
        'pageSize': 10,
        'resultList': [
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '40.60万',
            'id': 29611,
            'modelFullName': '奥迪A6L 2018款 30周年年型 TFSI 进取型',
            'modelName': '2018款 30周年年型 TFSI 进取型',
            'modelNo': '390820553474179072',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '42.10万',
            'id': 29612,
            'modelFullName': '奥迪A6L 2018款 30周年年型 35 TFSI 时尚型',
            'modelName': '2018款 30周年年型 35 TFSI 时尚型',
            'modelNo': '390820553893609472',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '44.94万',
            'id': 29613,
            'modelFullName': '奥迪A6L 2018款 30周年年型 35 TFSI 运动型',
            'modelName': '2018款 30周年年型 35 TFSI 运动型',
            'modelNo': '390820554313039872',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '46.70万',
            'id': 29614,
            'modelFullName': '奥迪A6L 2018款 30周年年型 30 FSI 风尚型',
            'modelName': '2018款 30周年年型 30 FSI 风尚型',
            'modelNo': '390820554736664576',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '51.28万',
            'id': 29615,
            'modelFullName': '奥迪A6L 2018款 30周年年型 45 TFSI quattro 运动型',
            'modelName': '2018款 30周年年型 45 TFSI quattro 运动型',
            'modelNo': '390820555156094976',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '58.98万',
            'id': 29616,
            'modelFullName': '奥迪A6L 2018款 30周年年型 45 TFSI quattro 豪华型',
            'modelName': '2018款 30周年年型 45 TFSI quattro 豪华型',
            'modelNo': '390820555575525376',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '69.80万',
            'id': 29617,
            'modelFullName': '奥迪A6L 2018款 30周年年型 50 TFSI quattro 尊享型',
            'modelName': '2018款 30周年年型 50 TFSI quattro 尊享型',
            'modelNo': '390820555999150080',
            'seriesYear': '2018'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '41.88万',
            'id': 29618,
            'modelFullName': '奥迪A6L 2017款 TFSI 技术型',
            'modelName': '2017款 TFSI 技术型',
            'modelNo': '390820556418580480',
            'seriesYear': '2017'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '43.88万',
            'id': 29619,
            'modelFullName': '奥迪A6L 2017款 30 FSI 技术型',
            'modelName': '2017款 30 FSI 技术型',
            'modelNo': '390820556842205184',
            'seriesYear': '2017'
          },
          {
            'gmtCreate': '2017-12-08 10:37:56',
            'guidancePrice': '45.65万',
            'id': 29620,
            'modelFullName': '奥迪A6L 2017款 TFSI 舒适型',
            'modelName': '2017款 TFSI 舒适型',
            'modelNo': '390820557261635584',
            'seriesYear': '2017'
          }
        ],
        'startIndex': 0,
        'totalNum': 29683,
        'totalPage': 2969
      },
      'reCode': '0000',
      'reMsg': '成功:',
      'success': true
    })
  },
  {
    url: '/ces/model/detail',
    on: true,
    resp: Mock.mock({
      'body': {
        'brandName': '奥迪AAAA',
        'classType': '中大型车',
        'doors': '4',
        'driveType': '前置前驱',
        'engine': '1.8T 190马力 L4',
        'engineEnvirStandard': '国V',
        'engineExhaust': '1798',
        'engineExhaustForFloat': '1.8',
        'engineFuel': '汽油',
        'engineIntake': '涡轮增压',
        'engineMaxNj': '320',
        'engineMaxNjSpeed': '1400-4100',
        'engineMaxPower': '140',
        'engineMaxPowerSpeed': '4200-6200',
        'engineType': '-',
        'gearNum': '7',
        'gearboxType': '双离合变速箱(DCT)',
        'guidancePrice': '406000.0',
        'highSpeed': '235',
        'hight': '1466',
        'hlSize': '245/45 R18',
        'listedTime': '2017.08',
        'ljH': '-',
        'ljQ': '-',
        'logourl': 'http://api.test.cheegu.com/img/brand/5164D3D15AE9E3A1FF64A104AA3FF714.png',
        'longMm': '5036',
        'luggage': '470',
        'masterBrand': '一汽-大众奥迪',
        'modelFullName': '奥迪A6L 2018款 30周年年型 TFSI 进取型',
        'modelImg': '//qncar2.autoimg.cn/cardfs/product/g5/M03/52/5F/autohomecar__wKgHzFmmhIGAeTHFAAwWCgxRjNc833.jpg?imageView2/1/w/240/h/180/format/jpeg',
        'modelNo': 390820553474179072,
        'name': '2018款 30周年年型 TFSI 进取型',
        'parkingType': '电子驻车',
        'qlSize': '245/45 R18',
        'referprice': '40.60万',
        'seats': '5',
        'serialId': 3118,
        'serialName': '奥迪A6L',
        'serialPic': 'http://car2.autoimg.cn/cardfs/product/g15/M06/F0/89/s_autohomecar__wKgH5VeoZpGALcoBAAsR5oY50CU663.jpg',
        'stated': '20',
        'struct': '4门5座三厢车',
        'tag': '',
        'tank': '75',
        'width': '1874',
        'yyyy': '2018',
        'zj': '3012'
      },
      'reCode': '0000',
      'reMsg': '成功:成功',
      'success': true
    })
  }
];
let result = [
  ...ary, ...menuList, ...product,
  ...invest, ...customerManage, ...enumSelectData,
  ...employerManage, ...department, ...companyCredit,
  ...loanbusiness, ...carDropList, ...distributor
];
export default result;
