export default {
  data() {
    return {
      creditInfo: {
        'singleLimit': '', // 单笔最大可用额度(元)
        // 外审信息集合
        'externalAuditDTOList': [
          {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }
        ],
        'endDate': '',
        'companyName': '',
        'creditLimitReleaseMode': '',
        // 审核意见信息
        'creditAuditDTO': [
          {
            'operUserName': '',
            'auditStatus': '',
            'operUserCode': '',
            'operTime': '',
            'opinion': ''
          }
        ],
        'creditApplyNo': '',
        'creditStatus': '',
        'surplusCountLimit': '',
        'quarterSurplusCountLimit': '',
        'countLimit': '',
        'creditCode': '',
        'companyNo': '',
        'monthCountLimit': '',
        // 初审信息集合
        'firstTrialDTOList': [
          {
            'itemName': '',
            'fileName': '',
            'description': '',
            'fileUrl': ''
          }
        ],
        'monthSurplusCountLimit': '',
        'startDate': '',
        'quarterCountLimit': ''
      }
    };
  }
};
