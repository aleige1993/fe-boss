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
            'id': 0,
            'title': 'banner1',
            'bannerUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515227477986&di=a464eeec9012dd3320b9f4fc1ca83c97&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F015589585b6435a8012060c8e37040.png%40900w_1l_2o_100sh.jpg',
            'linkUrl': 'https://image.baidu.com/search/',
            'index': 0,
            'activeStatus': true,
            'createUserCode': 'str',
            'modifiedUserCode': 'str',
            'gmtCreate': 1515139533309,
            'gmtModified': 1515139533309
          },
          {
            'id': 0,
            'title': 'banner1',
            'bannerUrl': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515227477986&di=a464eeec9012dd3320b9f4fc1ca83c97&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F015589585b6435a8012060c8e37040.png%40900w_1l_2o_100sh.jpg',
            'linkUrl': 'https://image.baidu.com/search/',
            'index': 1,
            'activeStatus': false,
            'createUserCode': 'str',
            'modifiedUserCode': 'str',
            'gmtCreate': 1515139533309,
            'gmtModified': 1515139533309
          }
        ]
      }
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
