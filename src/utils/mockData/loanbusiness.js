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
  // 签约管理-合同制作
  {
    url: '/makingList',
    on: true,
    resp: Mock.mock({
      'body': {
        'currentPage': 1,
        'pageSize': 15,
        'resultList|10': [
          {
            'contractNo|1': '111111111111111',
            'loanNo': '111111111111111',
            'corpName': 'mockjs数据',
            'legalPersonCerttype|1': ['1', '2'],
            'legalPersonCertno': /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            'productName|1': ['产品名称01', '产品名称02'],
            'periods|1': ['3', '6', '12', '18', '24'],
            'applicationMoney|500-10000': 500,
            'examinationMoney|500-10000': 500,
            'applicationDate': '@datetime()',
            'contractDate': '@datetime()',
            'dateLong': '@time("H:m:s")'
          }
        ]
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
