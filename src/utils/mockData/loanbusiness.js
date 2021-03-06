import Mock from 'mockjs';

export default [
  // 初审列表
  {
    url: '/biz/listLoanBizByCon',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 999999,
        'totalNum': 15,
        'resultList|15': [
          {
            'address': 'mockjs',
            'applyAddress': '重庆市渝中区嘉陵江滨江路58号靠近化龙桥海洋公园',
            'applyAmt|1000-10000': 1000,
            'applyPeriods|1-99': 1,
            'applyTime': '@date',
            'carBuyAmt|1000-10000': 1000,
            'carType|1': ['1', '2'],
            'carUse|1': ['1', '2', '3'],
            'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'certType|1': ['1', '2'],
            'channelNo': '111',
            'custKind': '111',
            'custType|1': ['1', '2'],
            'depositOrDownPayment|1-99': 1,
            'guaMethod|1-99': 1,
            'id|1-99': 1,
            'latitude|1-99': 1,
            'loanChannel|1-99': 1,
            'loanNo': '1111',
            'longitude|1-99': 1,
            'memberName': '@name',
            'memberNo': /[0-9]{15}/,
            'merchantAbbr': '海尔云贷',
            'merchantNo': /[0-9]{15}/,
            'mobileNo': '18623551111',
            'orderNo': /[0-9]{15}/,
            'productName': 'mockjs',
            'productNo': /[0-9]{15}/,
            'productType|1': ['1', '2'],
            'sex|1': ['1', '2'],
            'status|1': ['3', '4', '5'],
            'taskArriveTime': '@date',
            'taskAssignee': '1',
            'taskAssigneeName': 'admin',
            'taskNode|1': ['3', '4', '5'],
            'timeConsuming': /[1-9]{1,2}小时[1-9]{1,2}分[1-9]{1,2}秒/
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
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
            'taskStatus|1': ['0', '1', '2', '3', '4', '5', '9'],
            'signStatus|1': ['0', '1', '2', '3', '4', '5', '9'],
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
              'makeContractUrl': '',
              'contractName': 'mockjs数据',
              'makeSystem|1': ['本系统']
            }
          ]
        },
        'signNo': '',
        'custName': 'mockjs数据 999999',
        'merchantName': '',
        'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
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
  // 签约管理-合同制作-查看合同生成状态
  {
    url: '/biz/sign/contract/queryContract',
    on: true,
    resp: Mock.mock({
      'body': {
        'signStatus|1': ['0', '1', '2', '3'], // signStatus:1-合同生成中，2-生成失败，3-生成成功
        'loanNo': '',
        'loanContractAttachmentList|3': [
          {
            'contractNo': '1111',
            'contractName': '合同名称111',
            'startDate': '2018-04-03',
            'makeSystem|1': ['1', '2']
          }
        ]
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
            'guaPersonType|1': ['1', '2'],
            'guaPersonName': '马云',
            'guaPersonMobile': /023[0-9]{8}/,
            'guaPersonAddr': '重庆企业天地',
            'guaPersonNo': '1111111',
            'guaPersonCertType|1': ['1', '2'],
            'guaPersonCertNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'lsStatus|1': ['1', '2']
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理- 放款条件落实-办理详情
  {
    url: '/biz/payment/findPaymentApplyRecordInfo',
    on: true,
    resp: Mock.mock({
      'body': {
        'approveStatus': '',
        'rejectCause': '',
        'opinion': '',
        'paymentRecordDTO': {
          'shareAmt': '',
          'scRate': '',
          'capitalRate': '',
          'loanAmt': '11111111',
          'paymentType': '',
          'paymentSecondAmt': '',
          'expectLoanDate': ''
        },
        'paymentApplyRecordDTO': {
          'custNo': '',
          'warrantType|1': ['1', '2'],
          'certType': '',
          'loanNo': '',
          'operatingMode': '',
          'contractStartDate': '',
          'contractEndDate': '',
          'paymentNo': '',
          'custName': '',
          'productName': '',
          'totalPeriods': '',
          'merchantName': '',
          'signConfirmDate': '',
          'certNo': '',
          'telPhone': '',
          'custType': '',
          'addr': '',
          'applyDate': '',
          'loanTotalAmt': '',
          'productNo': '',
          'merchantNo': ''
        },
        'loanAccountDTO': {
          'loanAcctNo': '',
          'loanBankCode': '',
          'loanOpenBankCode': '',
          'loanBankName': '',
          'loanAcctName': '',
          'loanOpenBankName': ''
        },
        'repayAccountDTO': {
          'repayBankCode': '',
          'repayOpenBankCode': '',
          'repayAcctName': '',
          'repayOpenBankName': '',
          'repayAcctNo': '',
          'repayBankName': ''
        }
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 签约管理-合同制作-车辆信息 &  放款管理-办理详情-车辆信息
  {
    url: '/biz/listLoanCarByLoanNo',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|3': [
          {
            'guaranteeType|1': ['1', '2', '3'],
            'carBrandName': '长安',
            'carModelName': 'CS75',
            'carEngineNo': /[0-9A-Z]{18}/,
            'isMortgage|1': ['0', '1'],
            'isInstallGps|1': ['0', '1'],
            'gpsInstallStatus|1': ['0', '1'],
            'carVendor': '重庆长安',
            'carColor|1': ['月光白', '钛金色', '尊贵黑', '绿色', '水晶银灰', '弥红色'],
            'carPlateNo|1': /渝[ABCD]{1} [0-9A-Z]{5}/,
            'carFrameNo|1': /[0-9A-Z]{18}/,
            'loanCarGpsList|3': [
              {
                'gpsModel': /GPS型号[0-9A-Z]{4}/, // gps型号
                'imei': /IMEI[0-9A-Z]{4}/, // IMEI
                'gpsJoinMerchant': /GPS合作商[0-9]{4}/, // GPS合作商
                'gpsInstallStatus|1': ['0', '1'], // GPS安装状态
                'makeDate': '@date', // 办理时间
                'makeUser': '@name', // 办理人
                'id|1-100': 1, // 记录ID
                'loanCarNo|1-100': 1, // 抵押车辆编号
                'loanNo': '11111' // 项目编号
              }
            ],
            'mortgageName': '办理文件名01.jpg@办理文件名02.jpg@办理文件名03.png',
            'mortgageUrl': '@image(\'200x100\', \'#666\')' + '@' + '@image(\'200x100\', \'#333\')' + '@' + '@image(\'200x100\', \'#999\')',
            'makeDate': '@date',
            'makeUser': 'mockjs',
            'warrantNo': '0000001',
            'registerCompany': '巴山车管所',
            'mortgageStatus|1': ['0', '1'],
            'remark': /备注: [0-9a-zA-z]{10}/
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
      'body|3': [
        {
          'feeTypeCode|1': /[A-Z]{4,8}/,
          'feeName|1': ['租赁服务费', 'GPS安装费', '租赁保证金'],
          'feeTakeType|1': ['1', '2'],
          'isClearing|1': ['0', '1'],
          'isHang|1': ['0', '1'],
          'receivMode|1': ['1', '2', '3', '4'],
          'feePercent|1-100': 1,
          'feeActualAmt|500-10000': 500,
          'feeAmt|500-10000': 500,
          'alreadyReceivAmt|500-10000': 500
        }
      ],
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
  },
  // 初审提交
  {
    url: '/biz/sign/contract/fristApprove',
    on: true,
    resp: Mock.mock({
      'body': {},
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-放款条件列表
  {
    url: '/loanConditionListMock',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 10,
        'totalNum': 20,
        'resultList|10': [
          {
            'loanNo': '111111',
            'custName': 'mockjs',
            'certType|1': ['1', '2'],
            'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'productName': '@name',
            'loanPeriods|1': ['3', '6', '12', '18', '24'],
            'loanAmt|1000-100000': 1000,
            'applyTime': '@date()',
            'endDate': '@date()',
            'taskArriveTime': '@date()',
            'timeConsuming': '@time',
            'taskNode|1': ['1', '2', '3', '4', '5']
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-办理详情-担保信息
  {
    url: '/biz/listGuaranteeByLoanNo',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|3': [
          {
            'makeName': '办理抵押图片.jpg',
            'makeUrl': '@image(\'200x100\', \'#4A7BF7\', \'Hello\')',
            'makeUser': 'mockjs',
            'remark': /备注: [0-9a-zA-z]{10}/,
            'makeDate': '@date',
            'guaPersonType|1': ['1', '2'],
            'guaPersonNo': '1111111',
            'guaPersonName': 'mockjs',
            'guaPersonCertType|1': ['1', '2'],
            'guaPersonCertNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'guaPersonMobile': /1[3578]{1}[0-9]{9}/,
            'lsStatus|1': ['0', '1']
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-办理详情-放款条件列表
  {
    url: '/biz/getPaymentCondition',
    on: true,
    resp: Mock.mock({
      'body|3': [
        {
          'paymentConName': 'GPS安装完成',
          'remark': /[0-9A-Z]{18}/,
          'status|1': ['0', '1']
        }
      ],
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-办理详情-审批信息
  {
    url: '/biz/listApproveHistory',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'totalNum': 10,
        'resultList|10': [
          {
            'handleUserName': 'mockjs',
            'approveTaskNo': 'mockjs',
            'loanNo': 'mockjs',
            'handleUserCode': 'mockjs',
            'taskName': 'mockjs',
            'id': 'mockjs',
            'taskName|1': ['1', '2', '3', '4'],
            'startTime': '@date',
            'endTime': '@date',
            'timeConsuming': '@time',
            'approveStatus': /结论 [0-9a-z]{18}/,
            'opinion': /意见信息 [0-9a-z]{18}/
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-放款列表
  {
    url: '/biz/payment/pagePaymentApplyRecord',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 10,
        'totalNum': 20,
        'resultList|10': [
          {
            'paymentNo': 'mockjs', // 放款编号
            'loanNo': '111111',
            'custName': 'mockjs',
            'certType|1': ['1', '2'],
            'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'productName': '@name',
            'totalPeriods|1': ['3', '6', '12', '18', '24'],
            'loanTotalAmt|1000-100000': 1000,
            'applyTime': '@date()',
            'signConfirmDate': '@date()',
            'taskArriveTime': '@date()',
            'timeConsuming': '@time',
            'status|1': ['0', '1', '2', '3', '4', '9'],
            'taskNode|1': ['9']
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款管理-设置当前处理人 （可通用）
  {
    url: '/biz/loan/settingHandleUser',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 权证管理-设置当前处理人 （可通用）
  {
    url: '/biz/payment/settingHandleUserWithPawn',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款条件落实提交
  {
    url: '/biz/payment/paymentCondition',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款费用落实提交
  {
    url: '/biz/payment/paymentFee',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 放款审批提交
  {
    url: '/biz/payment/paymentApprove',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 权证待办列表
  {
    url: '/biz/payment/pagePaymentWaitDonePawn',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 10,
        'totalNum': 20,
        'resultList|10': [
          {
            'paymentNo': 'mockjs', // 放款编号
            'loanNo': '111111',
            'custName': 'mockjs',
            'certType|1': ['1', '2'],
            'certNo': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'productName': '@name',
            'totalPeriods|1': ['3', '6', '12', '18', '24'],
            'loanTotalAmt|1000-100000': 1000,
            'applyTime': '@date()',
            'signConfirmDate': '@date()',
            'taskArriveTime': '@date()',
            'timeConsuming': '@time',
            'status|1': ['0', '1', '2', '3', '4', '9'],
            'taskNode|1': ['9'],
            'backDays|1-365': 1,
            'surplusBackDays|1-365': 1
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 获取合同签约确认详情
  {
    url: '/biz/sign/findSignConfirmInfo',
    on: true,
    resp: Mock.mock({
      'body': {
        'certNo': '1111',
        'custNo': '1111',
        'certType': '1',
        'loanNo': '1111',
        'contractList|3': [
          {
            'signContractDate': '@date',
            'loanNo': '1111',
            'endDate': '@date',
            'contractNo|+1': 100,
            'makeContractUrl': '@image(\'200x100\', \'#4A7BF7\', \'Hello\')',
            'signStatus|1': ['0', '1'],
            'pkNo|+1': 100,
            'signMode|1': ['1', '2'],
            'signContractUrl': '@image(\'200x100\', \'#4A7BF7\', \'Hello\')',
            'contractName': 'mockjs',
            'makeSystem|1': ['1', '2'],
            'onlineSignStatus|1': ['1', '2', '3'],
            'startDate': '@date'
          }
        ],
        'tel': '',
        'signNo': '',
        'custName': '',
        'addr': ''
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 合同签署确认
  {
    url: '/biz/sign/signConfirm',
    on: true,
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
