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
            'custType|1': ['1', '2'],
            'carOwnerNo|5000-10000': 5000,
            'carOwnerName': '@name',
            'carModel': 'CS75',
            'carPlateNo': /渝[0-9A-Z]{5}/,
            'carEngineNo': /[A-Z0-9]{18}/,
            'carFrameNo': /[A-Z0-9]{18}/,
            'carEvaluatePrice|168000-300000': 168000
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
            'guaPersonType|1': ['1', '2'],
            'guaPersonNo|5000-10000': 5000,
            'guaPersonName': '@name',
            'guaType|1': ['1', '2'],
            'relation|1': ['1', '2', '3', '4', '5', '6'] // 担保人与债务人关系;1-亲属，2-父母，3,-子女，4-朋友，5-同事，6-同学
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 个人业务登记-个人信息-贷款材料列表
  {
    url: '/loan-loanList',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 999999,
        'resultList|3': [
          {
            'loanDocName|1': ['车辆登记证01', '车辆登记证02', '车辆登记证03'],
            'remark|1': ['备注', '测试'],
            'attachPath': '@image(\'200x100\', \'#FF6600\')'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 个人业务登记-审批信息-“审核历史意见”列表
  {
    url: '/examineData',
    type: 'get',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 999999,
        'resultList|5': [
          {
            'name': '@name',
            'taskNode|1': ['任务节点01', '任务节点02'],
            'timenStart': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'timeEnd': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'long': '@time("HH:mm:ss")',
            'conclusion|5-10': '结论文字',
            'opinion|10-30': '结论文字'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 设置当前处理人
  {
    url: '/biz/sign/settingHandleUser',
    on: true,
    resp: Mock.mock({
      'body': {},
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作列表
  {
    url: '/biz/sign/page',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|10': [
          {
            'custNo': /0000[0-9]{14}/,
            'certType|1': ['1', '2'],
            'loanNo': /[1]{18}/,
            'taskArriveTime': '@date()',
            'contractStartDate': '@date()',
            'signStatus': '签约状态',
            'contractEndDate': '',
            'signNo': /0000[0-9]{14}/,
            'custName': '@name',
            'loanAmt': '99999',
            'taskNode|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '99'],
            'productName': '@name',
            'merchantName': '',
            'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'coreSignNo': /0000[0-9]{14}/,
            'signConfirmTime': '',
            'custType': '',
            'periods|1': ['3', '6', '12', '18', '24'],
            'tel': '',
            'addr': '',
            'productNo': '',
            'taskStatus|1': ['1', '2', '3'],
            'merchantNo': '',
            'handleUserCode': '',
            'handleUserName': '',
            'timeConsuming': '@time("H:m:s")'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-合同信息详情
  {
    url: '/biz/sign/contract/findContractApproveInfo',
    on: true,
    resp: Mock.mock({
      'body': {
        'custNo': '111111',
        'certType': '1',
        'loanNo': '111111',
        'contractInfo': {
          'endDate': '@date()',
          'startDate': '@date()',
          'loanContractFileList|3': [
            {
              'contractNo': /0000[0-9]{14}/,
              'makeContractUrl|1': '@domain',
              'contractName': 'mockjs数据',
              'makeSystem|1': ['本系统']
            }
          ]
        },
        'signNo': '',
        'custName': 'mockjs数据 999999',
        'merchantName': '',
        'certNo': '',
        'loanAccount': {
          'loanAcctNo': '',
          'loanAcctName': 'mockjs数据 999999',
          'loanOpenBankName': ''
        },
        'repayAccount': {
          'repayAcctName': 'mockjs数据 999999',
          'repayOpenBankName': '',
          'repayAcctNo': ''
        },
        'tel': '',
        'addr': '',
        'merchantNo': ''
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-获取借款信息详情
  {
    url: '/biz/getApproveCredit',
    on: true,
    resp: Mock.mock({
      'body': {
        'gmtModified': '',
        'loanNo': '',
        'loanPeriods': '',
        'loanRealRate': '',
        'interestType': '',
        'capitalNo': '',
        'remark': '',
        'loanNominalRate': '',
        'productName': '@name',
        'loanApplyUse': '',
        'capitalName': '',
        'approveLimitAmt': '',
        'modifiedUserCode': '',
        'id': '',
        'loanRealUse': '',
        'productNo': '',
        'dqxInsurance': '',
        'operatingMode': '',
        'createUserCode': '',
        'carUse': '',
        'gmtCreate': '',
        'repaymentMode': '',
        'riskControlContent': '',
        'carTotalAmt': 'mockjs数据 999999',
        'loanMode': '',
        'carInsurance': ''
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-担保信息
  {
    url: '/biz/listGuaranteeByLoanNo',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|3': [
          {
            'guaPersonType|1': ['个人', '公司'],
            'guaPersonNo|+1': 123456789,
            'guaPersonName': '马云',
            'guaPersonCertType': '身份证',
            'guaPersonCertNo|1': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'guaPersonMobile': /023[0-9]{8}/,
            'guaPersonAddr': '重庆企业天地'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-车辆信息
  {
    url: '/biz/listLoanCarByLoanNo',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|3': [
          {
            'carBrandName': '长安',
            'carModel': 'CS75',
            'carVendor': '重庆长安',
            'carColor|1': ['月光白', '钛金色', '尊贵黑', '绿色', '水晶银灰', '弥红色'],
            'carPlateNo|1': /渝[ABCD]{1} [0-9A-Z]{5}/,
            'carEngineNo|1': /[0-9A-Z]{18}/,
            'carFrameNo|1': /[0-9A-Z]{18}/
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-费用收取方案
  {
    url: '/biz/listApproveFeePlan',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|3': [
          {
            'feeTypeCode|1': /[A-Z]{4,8}/,
            'feeName|1': ['租赁服务费', 'GPS安装费', '租赁保证金'],
            'feeTakeType|1': ['一次性收取', '分期收取'],
            'feeActualAmt|500-10000': 500
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-资金方列表（信息和还款计划表）
  {
    url: '/biz/sign/contract/listRepayPlanCapital',
    on: true,
    resp: Mock.mock({
      'body': {
        'loanCapitalList|3': [
          {
            'openBankNo': '',
            'bankCode': '',
            'capitalName': 'mockjs数据',
            'acctNo': /[0-9]{18}/,
            'capitalNo': '',
            'bankName': '',
            'acctName': '@name',
            'loanRate': '',
            'loanRatio|1-100': 1,
            'openBankName|1': ['中国建设银行', '中国光大银行', '中国招商银行', '中国农业银行', '中国工商银行'],
            'clearingBankNo': ''
          }
        ],
        'repayPlanCapitalList|3': [
          {
            'repayTotalAmt|101-2000': 101,
            'repayRate|1-100': 1,
            'nowPeriods|1': ['3', '6', '12', '18', '24'],
            'repayDate': '@date()',
            'repayAmt|100-1000': 100
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-租金还款计划列表信息
  {
    url: '/biz/sign/contract/listRepayPlanRental',
    on: true,
    resp: Mock.mock({
      'body': {
        'haiLeXingAccount': {
          'hlxAcctName': 'mockjs数据',
          'hlxAcctNo': '',
          'hlxOpenBankName': ''
        },
        'repayPlanRentalList|3': [
          {
            'repayTotalAmt|101-2000': 101,
            'repayRate|1-100': 1,
            'nowPeriods|1': ['3', '6', '12', '18', '24'],
            'repayDate': '@date()',
            'repayAmt|100-1000': 100
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
