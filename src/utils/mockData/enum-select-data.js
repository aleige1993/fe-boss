export default [
  {
    url: '/common/items',
    on: true,
    resp: {
      body: [
        {
          groupKey: 'YesNoEnum',
          items: [
            {
              itemCode: '1',
              itemName: '是'
            },
            {
              itemCode: '0',
              itemName: '否'
            }
          ]
        },
        {
          groupKey: 'SexEnum',
          items: [
            {
              itemCode: '1',
              itemName: '男'
            },
            {
              itemCode: '2',
              itemName: '女'
            }
          ]
        },
        {
          groupKey: 'CertTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '身份证'
            },
            {
              itemCode: '2',
              itemName: '护照'
            }
          ]
        },
        {
          groupKey: 'EducationEnum',
          items: [
            {
              itemCode: '1',
              itemName: '博士及以上'
            },
            {
              itemCode: '2',
              itemName: '硕士'
            },
            {
              itemCode: '3',
              itemName: '本科'
            },
            {
              itemCode: '4',
              itemName: '大专'
            },
            {
              itemCode: '9',
              itemName: '其他'
            }
          ]
        },
        {
          groupKey: 'MaritalStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '已婚'
            },
            {
              itemCode: '2',
              itemName: '未婚'
            },
            {
              itemCode: '3',
              itemName: '离异'
            },
            {
              itemCode: '4',
              itemName: '丧偶'
            },
            {
              itemCode: '9',
              itemName: '未知'
            }
          ]
        },
        {
          groupKey: 'WorkTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '工薪人士'
            },
            {
              itemCode: '2',
              itemName: '自由职业'
            },
            {
              itemCode: '3',
              itemName: '个体工商户或企业主'
            }
          ]
        },
        {
          groupKey: 'YearsEnum',
          items: [
            {
              itemCode: '99',
              itemName: '1年以内'
            },
            {
              itemCode: '1',
              itemName: '1年'
            },
            {
              itemCode: '2',
              itemName: '2年'
            },
            {
              itemCode: '3',
              itemName: '3年'
            },
            {
              itemCode: '4',
              itemName: '4年'
            },
            {
              itemCode: '5',
              itemName: '5年及以上'
            }
          ]
        },
        {
          groupKey: 'MemberStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '激活'
            },
            {
              itemCode: '2',
              itemName: '冻结'
            },
            {
              itemCode: '3',
              itemName: '草稿'
            }
          ]
        },
        {
          groupKey: 'MarriageStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '续存'
            },
            {
              itemCode: '2',
              itemName: '不续存'
            }
          ]
        },
        {
          groupKey: 'LiveTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '自有全款'
            },
            {
              itemCode: '2',
              itemName: '自有贷款'
            },
            {
              itemCode: '3',
              itemName: '租赁'
            },
            {
              itemCode: '9',
              itemName: '其他'
            }
          ]
        },
        {
          groupKey: 'BlacklistStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '黑名单'
            },
            {
              itemCode: '2',
              itemName: '已恢复白名单'
            }
          ]
        },
        {
          groupKey: 'UnitTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '国有企业'
            },
            {
              itemCode: '2',
              itemName: '国有控股企业'
            },
            {
              itemCode: '3',
              itemName: '外资企业'
            },
            {
              itemCode: '4',
              itemName: '合资企业'
            },
            {
              itemCode: '5',
              itemName: '私营企业'
            },
            {
              itemCode: '6',
              itemName: '事业单位'
            },
            {
              itemCode: '7',
              itemName: '国家政府机关'
            },
            {
              itemCode: '8',
              itemName: '政府'
            }
          ]
        },
        {
          groupKey: 'DutyEnum',
          items: [
            {
              itemCode: '1',
              itemName: '高级领导'
            },
            {
              itemCode: '2',
              itemName: '中级领导'
            },
            {
              itemCode: '3',
              itemName: '一般员工'
            },
            {
              itemCode: '4',
              itemName: '其他'
            }
          ]
        },
        {
          groupKey: 'RelativeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '亲属'
            },
            {
              itemCode: '2',
              itemName: '朋友'
            },
            {
              itemCode: '3',
              itemName: '同事'
            },
            {
              itemCode: '4',
              itemName: '父母'
            },
            {
              itemCode: '5',
              itemName: '子女'
            },
            {
              itemCode: '6',
              itemName: '兄弟/妹'
            },
            {
              itemCode: '7',
              itemName: '同学'
            }
          ]
        },
        {
          groupKey: 'ContactTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '紧急联系人'
            },
            {
              itemCode: '2',
              itemName: '工作证明人'
            },
            {
              itemCode: '3',
              itemName: '家庭联系人'
            }
          ]
        },
        {
          groupKey: 'MortgageTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '车辆'
            },
            {
              itemCode: '2',
              itemName: '房产'
            }
          ]
        },
        {
          groupKey: 'CreditTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '信用良好'
            },
            {
              itemCode: '2',
              itemName: '少数逾期'
            },
            {
              itemCode: '3',
              itemName: '多次逾期'
            },
            {
              itemCode: '4',
              itemName: '无信用记录'
            }
          ]
        },
        {
          groupKey: 'MonthRevenueEnum',
          items: [
            {
              itemCode: '1',
              itemName: '3000元以下'
            },
            {
              itemCode: '2',
              itemName: '3000-5000元'
            },
            {
              itemCode: '3',
              itemName: '5000-8000元'
            },
            {
              itemCode: '4',
              itemName: '8000-12000元'
            },
            {
              itemCode: '5',
              itemName: '12000-20000元'
            },
            {
              itemCode: '6',
              itemName: '20000元以上'
            }
          ]
        },
        {
          groupKey: 'HaveNoEnum',
          items: [
            {
              itemCode: '1',
              itemName: '有'
            },
            {
              itemCode: '0',
              itemName: '无'
            }
          ]
        },
        {
          groupKey: 'HaveCompanyRelativeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '全资'
            },
            {
              itemCode: '2',
              itemName: '控股'
            },
            {
              itemCode: '3',
              itemName: '持股'
            },
            {
              itemCode: '4',
              itemName: '核心经营者'
            },
            {
              itemCode: '5',
              itemName: '实际控制人'
            }
          ]
        },
        {
          groupKey: 'ProductStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '启用'
            },
            {
              itemCode: '2',
              itemName: '停用'
            },
            {
              itemCode: '3',
              itemName: '初始化'
            }
          ]
        },
        {
          groupKey: 'ReceiveTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按比例'
            },
            {
              itemCode: '2',
              itemName: '按固定金额'
            }
          ]
        },
        {
          groupKey: 'FeeTypeEnum',
          items: [
            {
              itemCode: 'C',
              itemName: '收入'
            },
            {
              itemCode: 'D',
              itemName: '支出'
            }
          ]
        },
        {
          groupKey: 'ProductTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '乘用车'
            },
            {
              itemCode: '2',
              itemName: '商用车'
            },
            {
              itemCode: '3',
              itemName: '轻卡'
            },
            {
              itemCode: '4',
              itemName: '微卡'
            },
            {
              itemCode: '5',
              itemName: '新能源'
            }
          ]
        },
        {
          groupKey: 'FreedTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按还本金额释放'
            },
            {
              itemCode: '2',
              itemName: '按贷款结清'
            }
          ]
        },
        {
          groupKey: 'InterestTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按实际天数计算'
            },
            {
              itemCode: '2',
              itemName: '按固定30天计算'
            }
          ]
        },
        {
          groupKey: 'ModelTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '不算头不算尾'
            },
            {
              itemCode: '2',
              itemName: '算头不算尾'
            },
            {
              itemCode: '3',
              itemName: '算头又算尾'
            }
          ]
        },
        {
          groupKey: 'OverdueTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按合同金额收取'
            },
            {
              itemCode: '2',
              itemName: '按应还未还金额收取'
            }
          ]
        },
        {
          groupKey: 'RepaymentPeriodEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按日'
            },
            {
              itemCode: '2',
              itemName: '按月'
            },
            {
              itemCode: '3',
              itemName: '按季'
            },
            {
              itemCode: '4',
              itemName: '按半年'
            },
            {
              itemCode: '5',
              itemName: '按年'
            },
            {
              itemCode: '6',
              itemName: '自定义'
            }
          ]
        },
        {
          groupKey: 'RepaymentRuleEnum',
          items: [
            {
              itemCode: '1',
              itemName: '对日还款'
            },
            {
              itemCode: '2',
              itemName: '指定日还款'
            }
          ]
        },
        {
          groupKey: 'RepaymentTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '等额本金'
            },
            {
              itemCode: '2',
              itemName: '等额本息'
            },
            {
              itemCode: '3',
              itemName: '等本等息'
            },
            {
              itemCode: '4',
              itemName: '按期收息，期末收本'
            }
          ]
        },
        {
          groupKey: 'YearModelEnum',
          items: [
            {
              itemCode: '360',
              itemName: '按360天计算'
            },
            {
              itemCode: '365',
              itemName: '按365天计算'
            }
          ]
        },
        {
          groupKey: 'BizTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '一手车'
            },
            {
              itemCode: '2',
              itemName: '二手车'
            }
          ]
        },
        {
          groupKey: 'CreditFreedTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按还本金额释放'
            },
            {
              itemCode: '2',
              itemName: '按贷款结清'
            },
            {
              itemCode: '3',
              itemName: '按权证方式入库'
            }
          ]
        },
        {
          groupKey: 'CreditAuditStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '有效'
            },
            {
              itemCode: '2',
              itemName: '授信申请'
            },
            {
              itemCode: '3',
              itemName: '初审待处理'
            },
            {
              itemCode: '4',
              itemName: '初审中'
            },
            {
              itemCode: '5',
              itemName: '外审待处理'
            },
            {
              itemCode: '6',
              itemName: '外审处理中'
            },
            {
              itemCode: '7',
              itemName: '审批待处理'
            },
            {
              itemCode: '8',
              itemName: '审批处理中'
            },
            {
              itemCode: '97',
              itemName: '已撤回'
            },
            {
              itemCode: '98',
              itemName: '授信过期'
            },
            {
              itemCode: '99',
              itemName: '审核不通过'
            }
          ]
        },
        {
          groupKey: 'ApproveStatusEnum',
          items: [
            {
              itemCode: 'A',
              itemName: '同意'
            },
            {
              itemCode: 'R',
              itemName: '拒绝'
            },
            {
              itemCode: 'B',
              itemName: '退回'
            },
            {
              itemCode: 'D',
              itemName: '废弃'
            }
          ]
        },
        {
          groupKey: 'CarInsuranceEnum',
          items: [
            {
              itemCode: '1',
              itemName: '乙方自行支付保险费'
            },
            {
              itemCode: '2',
              itemName: '保险费计入每月租金'
            }
          ]
        },
        {
          groupKey: 'DqxInsuranceEnum',
          items: [
            {
              itemCode: '1',
              itemName: '乙方应购买盗抢险'
            },
            {
              itemCode: '2',
              itemName: '乙方无需购买盗抢险'
            }
          ]
        },
        {
          groupKey: 'RateModeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '固定利率'
            },
            {
              itemCode: '2',
              itemName: '浮动利率'
            }
          ]
        },
        {
          groupKey: 'OperatingModeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '融资租赁模式'
            },
            {
              itemCode: '2',
              itemName: '直接资方模式'
            }
          ]
        },
        {
          groupKey: 'ServiceFeeTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '一次性收取'
            },
            {
              itemCode: '2',
              itemName: '分期收取'
            }
          ]
        },
        {
          groupKey: 'SubsidyTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '全贴'
            },
            {
              itemCode: '2',
              itemName: '全不贴'
            }
          ]
        },
        {
          groupKey: 'SignTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '线上'
            },
            {
              itemCode: '2',
              itemName: '线下'
            }
          ]
        },
        {
          groupKey: 'CooperationStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '合作中'
            },
            {
              itemCode: '2',
              itemName: '终止合作'
            }
          ]
        },
        {
          groupKey: 'ContractTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '借款合同'
            },
            {
              itemCode: '2',
              itemName: '抵押合同'
            },
            {
              itemCode: '3',
              itemName: '质押合同'
            },
            {
              itemCode: '4',
              itemName: '其他合同'
            }
          ]
        },
        {
          groupKey: 'CreditReleaseTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '按权证归档释放'
            }
          ]
        },
        {
          groupKey: 'MerchantStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '未授信'
            },
            {
              itemCode: '1',
              itemName: '授信申请中'
            },
            {
              itemCode: '2',
              itemName: '已授信'
            },
            {
              itemCode: '3',
              itemName: '授信拒绝'
            },
            {
              itemCode: '4',
              itemName: '授信未通过'
            },
            {
              itemCode: '5',
              itemName: '授信过期'
            },
            {
              itemCode: '6',
              itemName: '授信变更中'
            }
          ]
        },
        {
          groupKey: 'EnableStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '冻结'
            },
            {
              itemCode: '1',
              itemName: '激活'
            }
          ]
        },
        {
          groupKey: 'MerchantCreditStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '草稿'
            },
            {
              itemCode: '7',
              itemName: '授信待审核'
            },
            {
              itemCode: '1',
              itemName: '授信审核中'
            },
            {
              itemCode: '2',
              itemName: '授信通过'
            },
            {
              itemCode: '3',
              itemName: '授信拒绝'
            },
            {
              itemCode: '4',
              itemName: '授信驳回'
            },
            {
              itemCode: '8',
              itemName: '授信废弃'
            }
          ]
        },
        {
          groupKey: 'SalesStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '停售'
            },
            {
              itemCode: '1',
              itemName: '在售'
            }
          ]
        },
        {
          groupKey: 'OperatorTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '超级管理员'
            },
            {
              itemCode: '2',
              itemName: '普通用户'
            }
          ]
        },
        {
          groupKey: 'MerchantChannelTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '经销商'
            },
            {
              itemCode: '2',
              itemName: '合伙人'
            },
            {
              itemCode: '3',
              itemName: '物流公司'
            }
          ]
        },
        {
          groupKey: 'MerchantTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '4S店'
            },
            {
              itemCode: '3',
              itemName: '二网商'
            }
          ]
        },
        {
          groupKey: 'CorpCreditLimitStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '有效'
            },
            {
              itemCode: '2',
              itemName: '授信审核中'
            },
            {
              itemCode: '3',
              itemName: '授信过期'
            },
            {
              itemCode: '4',
              itemName: '授信审核不通过'
            }
          ]
        },
        {
          groupKey: 'BaseStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '冻结'
            },
            {
              itemCode: '1',
              itemName: '激活'
            }
          ]
        },
        {
          groupKey: 'PrePayMentAccrualModeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '提前还款不足月的按月收取利息'
            }
          ]
        },
        {
          groupKey: 'CustTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '个人'
            },
            {
              itemCode: '2',
              itemName: '公司'
            }
          ]
        },
        {
          groupKey: 'WarrantTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '个人'
            },
            {
              itemCode: '2',
              itemName: '公司'
            }
          ]
        },
        {
          groupKey: 'LoanBizNodeEnum',
          items: [
            {
              itemCode: '0',
              itemName: '渠道商录单'
            },
            {
              itemCode: '1',
              itemName: '录单'
            },
            {
              itemCode: '2',
              itemName: '征信查询'
            },
            {
              itemCode: '3',
              itemName: '初审'
            },
            {
              itemCode: '4',
              itemName: '风控总监审批'
            },
            {
              itemCode: '5',
              itemName: '总经理审批'
            },
            {
              itemCode: '6',
              itemName: '合同制作'
            },
            {
              itemCode: '8',
              itemName: '合同签署确认'
            },
            {
              itemCode: '9',
              itemName: '放款条件落实'
            },
            {
              itemCode: '10',
              itemName: '放款费用落实'
            },
            {
              itemCode: '11',
              itemName: '放款审批'
            },
            {
              itemCode: '99',
              itemName: '归档完成'
            }
          ]
        },
        {
          groupKey: 'MakeSystemEnum',
          items: [
            {
              itemCode: '1',
              itemName: '本系统'
            },
            {
              itemCode: '2',
              itemName: '资金方系统'
            }
          ]
        },
        {
          groupKey: 'CarUseTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '本人自用'
            },
            {
              itemCode: '2',
              itemName: '指定第三方自用'
            },
            {
              itemCode: '3',
              itemName: '商用'
            }
          ]
        },
        {
          groupKey: 'LoanApplyUseEnum',
          items: [
            {
              itemCode: '1',
              itemName: '流动资金周转'
            },
            {
              itemCode: '2',
              itemName: '固定资产投资贷款'
            },
            {
              itemCode: '3',
              itemName: '项目融资贷款'
            },
            {
              itemCode: '4',
              itemName: '个人消费'
            },
            {
              itemCode: '5',
              itemName: '企业经营'
            }
          ]
        },
        {
          groupKey: 'LoanModeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '受托支付至第三方'
            },
            {
              itemCode: '2',
              itemName: '直接支付给客户账户'
            }
          ]
        },
        {
          groupKey: 'ContractSignStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '已签署'
            },
            {
              itemCode: '0',
              itemName: '未签署'
            }
          ]
        },
        {
          groupKey: 'ContractOnlineSignStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '签署成功'
            },
            {
              itemCode: '2',
              itemName: '签署失败'
            },
            {
              itemCode: '3',
              itemName: '待签署'
            }
          ]
        },
        {
          groupKey: 'ApproveRuleEnum',
          items: [
            {
              itemCode: '1',
              itemName: '符合'
            },
            {
              itemCode: '2',
              itemName: '不符合'
            },
            {
              itemCode: '3',
              itemName: '无法核对'
            }
          ]
        },
        {
          groupKey: 'BizChannelEnum',
          items: [
            {
              itemCode: '1',
              itemName: 'Android'
            },
            {
              itemCode: '2',
              itemName: 'IOS'
            },
            {
              itemCode: '3',
              itemName: 'Web'
            },
            {
              itemCode: '4',
              itemName: 'TX'
            }
          ]
        },
        {
          groupKey: 'BizStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '未处理'
            },
            {
              itemCode: '1',
              itemName: '处理中'
            },
            {
              itemCode: '2',
              itemName: '已处理'
            },
            {
              itemCode: '3',
              itemName: '草稿'
            },
            {
              itemCode: '4',
              itemName: '拒绝'
            },
            {
              itemCode: '5',
              itemName: '退回'
            },
            {
              itemCode: '6',
              itemName: '征信授权书创建是失败'
            },
            {
              itemCode: '7',
              itemName: '征信授权书签署失败'
            },
            {
              itemCode: '8',
              itemName: '征信授权书查询失败'
            },
            {
              itemCode: '9',
              itemName: '废弃'
            }
          ]
        },
        {
          groupKey: 'CarColorEnum',
          items: [
            {
              itemCode: '1',
              itemName: '米色'
            },
            {
              itemCode: '2',
              itemName: '金色'
            },
            {
              itemCode: '3',
              itemName: '棕色'
            },
            {
              itemCode: '4',
              itemName: '紫色'
            },
            {
              itemCode: '5',
              itemName: '黑色'
            },
            {
              itemCode: '6',
              itemName: '蓝色'
            },
            {
              itemCode: '7',
              itemName: '灰色'
            },
            {
              itemCode: '8',
              itemName: '绿色'
            },
            {
              itemCode: '9',
              itemName: '红色'
            },
            {
              itemCode: '10',
              itemName: '橙色'
            },
            {
              itemCode: '11',
              itemName: '白色'
            },
            {
              itemCode: '12',
              itemName: '银色'
            },
            {
              itemCode: '13',
              itemName: '黄色'
            },
            {
              itemCode: '14',
              itemName: '巧克力色'
            },
            {
              itemCode: '15',
              itemName: '香槟色'
            }
          ]
        },
        {
          groupKey: 'CarConditionEnum',
          items: [
            {
              itemCode: '1',
              itemName: '优'
            },
            {
              itemCode: '2',
              itemName: '良'
            },
            {
              itemCode: '3',
              itemName: '中'
            },
            {
              itemCode: '4',
              itemName: '差'
            }
          ]
        },
        {
          groupKey: 'CustomTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '新增客户'
            },
            {
              itemCode: '2',
              itemName: '结清再贷'
            }
          ]
        },
        {
          groupKey: 'GuaranteeTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '个人担保'
            },
            {
              itemCode: '2',
              itemName: '夫妻担保'
            },
            {
              itemCode: '3',
              itemName: '直系亲属担保'
            },
            {
              itemCode: '4',
              itemName: '公司担保'
            }
          ]
        },
        {
          groupKey: 'LoanUseEnum',
          items: [
            {
              itemCode: '1',
              itemName: '流动资金周转'
            },
            {
              itemCode: '2',
              itemName: '固定资产投资贷款'
            },
            {
              itemCode: '3',
              itemName: '项目融资贷款'
            },
            {
              itemCode: '4',
              itemName: '个人消费'
            },
            {
              itemCode: '5',
              itemName: '企业经营'
            }
          ]
        },
        {
          groupKey: 'PawnTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '抵押'
            },
            {
              itemCode: '2',
              itemName: '质押'
            },
            {
              itemCode: '3',
              itemName: '信用'
            },
            {
              itemCode: '4',
              itemName: '保证'
            }
          ]
        },
        {
          groupKey: 'ReceivModeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '现金'
            },
            {
              itemCode: '2',
              itemName: '转账'
            },
            {
              itemCode: '3',
              itemName: 'POS'
            },
            {
              itemCode: '4',
              itemName: '支票'
            }
          ]
        },
        {
          groupKey: 'MortgageStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '未抵押'
            },
            {
              itemCode: '1',
              itemName: '已抵押'
            }
          ]
        },
        {
          groupKey: 'LoanLuoShiStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '未落实'
            },
            {
              itemCode: '1',
              itemName: '已落实'
            }
          ]
        },
        {
          groupKey: 'GpsInstallStatusEnum',
          items: [
            {
              itemCode: '0',
              itemName: '未安装'
            },
            {
              itemCode: '1',
              itemName: '已安装'
            }
          ]
        },
        {
          groupKey: 'MbOrderStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '草稿'
            },
            {
              itemCode: '2',
              itemName: '待实名认证'
            },
            {
              itemCode: '3',
              itemName: '待绑定银行卡'
            },
            {
              itemCode: '4',
              itemName: '待征信授权'
            },
            {
              itemCode: '5',
              itemName: '待获取联系人'
            },
            {
              itemCode: '6',
              itemName: '待补充资料'
            },
            {
              itemCode: '7',
              itemName: '待审核'
            },
            {
              itemCode: '8',
              itemName: '额度审核中'
            },
            {
              itemCode: '9',
              itemName: '额度已审核'
            },
            {
              itemCode: '10',
              itemName: '待制作合同'
            },
            {
              itemCode: '11',
              itemName: '合同制作中'
            },
            {
              itemCode: '12',
              itemName: '待签署合同'
            },
            {
              itemCode: '13',
              itemName: '合同已签署'
            },
            {
              itemCode: '14',
              itemName: '待放款'
            },
            {
              itemCode: '15',
              itemName: '放款审核中'
            },
            {
              itemCode: '16',
              itemName: '已放款'
            },
            {
              itemCode: '17',
              itemName: '还款中'
            },
            {
              itemCode: '18',
              itemName: '已完成'
            },
            {
              itemCode: '19',
              itemName: '审核未通过'
            },
            {
              itemCode: '20',
              itemName: '订单取消'
            }
          ]
        },
        {
          groupKey: 'smsTriggerPointEnum',
          items: [
            {
              itemCode: '1',
              itemName: '用户注册'
            },
            {
              itemCode: '2',
              itemName: '找回密码'
            },
            {
              itemCode: '3',
              itemName: '绑定银行卡'
            },
            {
              itemCode: '4',
              itemName: '授信审核通过'
            },
            {
              itemCode: '5',
              itemName: '授信审核拒绝'
            },
            {
              itemCode: '6',
              itemName: '还款提醒(前3天)'
            },
            {
              itemCode: '7',
              itemName: '还款提醒(当天)'
            },
            {
              itemCode: '8',
              itemName: '还款成功'
            },
            {
              itemCode: '9',
              itemName: '还款失败'
            },
            {
              itemCode: '10',
              itemName: '贷款结清'
            }
          ]
        },
        {
          groupKey: 'PaymentStatusEnum',
          items: [
            {
              itemCode: '1',
              itemName: '放款成功'
            },
            {
              itemCode: '2',
              itemName: '放款处理中'
            },
            {
              itemCode: '3',
              itemName: '财务放款待确认'
            },
            {
              itemCode: '4',
              itemName: '财务放款确认中'
            },
            {
              itemCode: '5',
              itemName: '放款失败'
            },
            {
              itemCode: '9',
              itemName: '取消放款'
            }
          ]
        },
        {
          groupKey: 'IndustryTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '农、林、牧、渔业'
            },
            {
              itemCode: '2',
              itemName: '制造业'
            },
            {
              itemCode: '3',
              itemName: '建筑业'
            },
            {
              itemCode: '4',
              itemName: '批发和零售业'
            },
            {
              itemCode: '5',
              itemName: '交通运输、仓储和邮政业'
            },
            {
              itemCode: '6',
              itemName: '住宿和餐饮业'
            },
            {
              itemCode: '7',
              itemName: '信息传输、软件和信息技术服务业'
            },
            {
              itemCode: '8',
              itemName: '金融业'
            },
            {
              itemCode: '9',
              itemName: '租赁和商务服务业'
            },
            {
              itemCode: '10',
              itemName: '教育'
            },
            {
              itemCode: '11',
              itemName: '公共管理、社会保障和社会组织'
            }
          ]
        },
        {
          groupKey: 'ContractFieldTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '常量'
            },
            {
              itemCode: '2',
              itemName: '变量'
            }
          ]
        },
        {
          groupKey: 'ContractSourceEnum',
          items: [
            {
              itemCode: '1',
              itemName: '资金方'
            },
            {
              itemCode: '2',
              itemName: '云易行'
            },
            {
              itemCode: '3',
              itemName: '海乐行'
            }
          ]
        },
        {
          groupKey: 'QualificationAssessTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '基本情况'
            },
            {
              itemCode: '2',
              itemName: '财务状况'
            },
            {
              itemCode: '3',
              itemName: '信用记录'
            },
            {
              itemCode: '4',
              itemName: '本笔贷款情况'
            }
          ]
        },
        {
          groupKey: 'LoanWarrantTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '先入库后抵押'
            },
            {
              itemCode: '2',
              itemName: '先抵押后入库'
            }
          ]
        },
        {
          groupKey: 'LoanFeeAccordingTypeEnum',
          items: [
            {
              itemCode: '1',
              itemName: '贷款金额'
            },
            {
              itemCode: '2',
              itemName: '申请金额'
            },
            {
              itemCode: '3',
              itemName: '车辆价格'
            }
          ]
        },
        {
          groupKey: 'BizApproveRejectEnum',
          items: [
            {
              itemCode: '01',
              itemName: '资料不全且未补件'
            },
            {
              itemCode: '02',
              itemName: '联系人中有本司逾期的或黑名单'
            },
            {
              itemCode: '03',
              itemName: '近期查询信用记录次数较多'
            },
            {
              itemCode: '04',
              itemName: '曾经有过恶意逾期或不良记录'
            },
            {
              itemCode: '05',
              itemName: '为他人担保巨额债务'
            },
            {
              itemCode: '06',
              itemName: '已有多家贷款记录'
            },
            {
              itemCode: '07',
              itemName: '配偶的信用糟糕'
            },
            {
              itemCode: '08',
              itemName: '还款能力不强'
            },
            {
              itemCode: '09',
              itemName: '虚假信息拒绝'
            },
            {
              itemCode: '99',
              itemName: '其他原因'
            }
          ]
        },
        {
          groupKey: 'PublicFlagEnum',
          items: [
            {
              itemCode: '0',
              itemName: '对私'
            },
            {
              itemCode: '1',
              itemName: '对公'
            }
          ]
        },
        {
          groupKey: 'RepayAccountFlagEnum',
          items: [
            {
              itemCode: '1',
              itemName: '代付'
            },
            {
              itemCode: '2',
              itemName: '代扣'
            },
            {
              itemCode: '3',
              itemName: '代付、代扣'
            }
          ]
        }
      ],
      reCode: '0000',
      reMsg: '成功',
      success: true
    }
  }
];
