import Mock from 'mockjs';
export default [
  // 产品配置
  {
    url: '/pms/product/list',
    on: true,
    type: 'get',
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'productNo': 'CP1001',
            'productName|1': ['产品名称1', '产品名称2', '产品名称3', '产品名称4', '产品名称5'],
            'productType|1': ['1', '2', '3', '4', '5'],
            'status|1': ['1', '2'],
            'gmtCreate': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            'gmtModified': '@now("yyyy-MM-dd HH:mm:ss")',
            'createUserCode': '@name'
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-贷款材料配置
  {
    url: '/pms/cfgLoanDoc/list',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'loanDocCode|+1': 1,
            'loanDocName': /[测试字体]{4,30}/
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-费用类型配置
  {
    url: '/pms/cfgFeeType/list',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'feeTypeNo|+1': 1,
            'feeTypeName': '@name',
            'feeType|1': ['收入', '支出']
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-准入规则配置
  {
    url: '/pms/cfgApproveRule/list',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'approveRuleCode|+1': 1,
            'approveRuleName': /[测试字体]{4,30}/
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-车辆材料配置
  {
    url: '/pms/cfgVehicleDoc/list',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'vehicleDocName|+1': 1,
            'vehicleDocCode': /[测试字体]{4,30}/
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-归档材料配置
  {
    url: '/pms/cfgFinishedDoc/list',
    on: false,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'isMore': 0,
        'pageSize': 15,
        'resultList|10': [
          {
            'finishedDocCode|+1': 1,
            'finishedDocName': /[测试字体]{4,30}/
          }
        ],
        'startIndex': 0,
        'totalNum': 100,
        'totalPage': 1
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 产品配置-利率方案配置-表单数据
  {
    url: '/pms/productPackage/list',
    on: true,
    type: 'get',
    resp: Mock.mock({
      'body|5': [
        {
          'packageNo': '', // 套餐编号
          'personalSingleCarLimit': '123', // 个人单笔额度
          'personalSingleDoorLimit': '123',  // 个人单户额度
          'companySingleCarLimit': '123',  // 企业单笔额度
          'companySingleDoorLimit': '123', // 企业单户额度
          'loanMode': '', // 还款方式
          'loanCycleMode': '',  // 还款周期
          'loanCycle': '',  // 还款周期天数
          'modelSet': '', // 模型设定
          'monthAccrualMode': '', // 月息方式
          'yearModel': '',  // 年模型
          'loanDayMode': '',  // 还款日规则
          'loanDay': '12',  // 还款日
          'overdueCountMode': '', // 逾期计算方式
          'dayOverduePenaltyRatio': '', // 逾期利率
          'dayOverdueManageFee': '',  // 逾期管理费
          'overdueExtendDays': '',  // 逾期宽限天数
          'penaltyCountMode': '', // 罚息计算方式
          'penaltyDayRatio': '',  // 罚息利率
          'isUpRepay': '',  // 是否允许提前还款
          'upRepayPenaltyCountMode': '',  // 提前还款违约金计算方式
          'upRepayPenaltyRatio': '',  // 提前还款违约金比例
          'upRepayCountDays': '', // 提前还款利息不足天数
          'upRepayMinCountDays': '12',  // 提前还款利息最低天数
          'depositReleaseMode': '34', // 保证金释放方式
          'creditLimitReleaseMode': '', // 授信释放方式
          'isAdvance|1': ['1', '2'] // 是否海乐行垫付
        }
      ],
      'reCode': '0000'
    })
  },
  // 产品配置-利率方案配置
  {
    url: '/pms/productPackage/list',
    on: true,
    type: 'get',
    resp: Mock.mock({
      'reCode': '0000',
      'reMsg': '成功',
      'success': true,
      'body|5': [
        {
          'bizType|1': ['1', '2'],
          'loanPeriods|1': ['3', '6', '12', '18', '24'],
          'loanNominalRate|1': ['0.15', '0.25', '0.2', '0.3', '0.1'],
          'loanRealRate|1': ['0.15', '0.25', '0.2', '0.3', '0.1']
        }
      ]
    })
  },
  // 产品配置-费用收取配置弹窗
  {
    url: '/productFy',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      'list|1-5': [
        {
          'id|+1': 1,
          'name|1': ['费用类型名称1', '费用类型名称2', '费用类型名称3', '费用类型名称4'],
          'mode|1': ['按比例', '按固定金额'],
          'direction|1': ['收入', '支出'],
          'standard|1': ['0.1', '0.15', '0.2'],
          'money|50-3000': 50
        }
      ],
      reMsg: '成功'
    })
  },
  // 产品配置
  {
    url: '/productDetails',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      list: {
        'data1|1-5': [
          {
            'TcID|+1': 1,
            'TcName': '@name',
            'TcType|1': ['套餐类型1', '套餐类型2', '套餐类型3', '套餐类型4', '套餐类型5'],
            'TcTerm|1': ['12', '18', '24'],
            'TcMode|1': ['正常还款', '逾期还款', '提前还款', '续贷'],
            'TcCycle|1': ['12', '18', '24'],
            'TcOption|1': ['正常还款', '逾期还款', '提前还款', '续贷'],
            'TcRate|1': ['0.1%', '0.15%', '0.2%', '0.25%', '0.3%']
          }
        ],
        'data2|1-5': [
          {
            'FyOption|1': ['选择1', '选择2', '选择3'],
            'FyType|1': ['类型1', '类型2', '类型3'],
            'FyStandard|1': ['标准1', '标准2', '标准3']
          }
        ],
        'data3|1-5': [
          {
            'BillID|+1': 1,
            'BillType|1': ['类型1', '类型2', '类型3'],
            'BillNmae': '@name',
            'isOriginal|1': ['是', '否'],
            'isCopy|1': ['是', '否'],
            'isImage|1': ['是', '否'],
            'isVideo|1': ['是', '否']
          }
        ]
      },
      reMsg: '成功'
    })
  }
];
