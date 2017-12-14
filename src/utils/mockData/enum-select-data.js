export default [
  {
    url: '/common/items',
    on: true,
    resp: {
      'body': [
        {
          'groupKey': 'YesNoEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '是'
            },
            {
              'itemCode': '0',
              'itemName': '否'
            }
          ]
        },
        {
          'groupKey': 'SexEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '男'
            },
            {
              'itemCode': '2',
              'itemName': '女'
            }
          ]
        },
        {
          'groupKey': 'CertTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '身份证'
            },
            {
              'itemCode': '2',
              'itemName': '护照'
            }
          ]
        },
        {
          'groupKey': 'EducationEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '博士及以上'
            },
            {
              'itemCode': '2',
              'itemName': '硕士'
            },
            {
              'itemCode': '3',
              'itemName': '本科'
            },
            {
              'itemCode': '4',
              'itemName': '大专'
            },
            {
              'itemCode': '9',
              'itemName': '其他'
            }
          ]
        },
        {
          'groupKey': 'MaritalStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '已婚'
            },
            {
              'itemCode': '2',
              'itemName': '未婚'
            },
            {
              'itemCode': '3',
              'itemName': '离异'
            },
            {
              'itemCode': '4',
              'itemName': '丧偶'
            },
            {
              'itemCode': '9',
              'itemName': '未知'
            }
          ]
        },
        {
          'groupKey': 'WorkTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '工薪人士'
            },
            {
              'itemCode': '2',
              'itemName': '自由职业'
            },
            {
              'itemCode': '3',
              'itemName': '个体工商户或企业主'
            }
          ]
        },
        {
          'groupKey': 'YearsEnum',
          'items': [
            {
              'itemCode': '99',
              'itemName': '1年以内'
            },
            {
              'itemCode': '1',
              'itemName': '1年'
            },
            {
              'itemCode': '2',
              'itemName': '2年'
            },
            {
              'itemCode': '3',
              'itemName': '3年'
            },
            {
              'itemCode': '4',
              'itemName': '4年'
            },
            {
              'itemCode': '5',
              'itemName': '5年及以上'
            }
          ]
        },
        {
          'groupKey': 'MemberStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '激活'
            },
            {
              'itemCode': '2',
              'itemName': '冻结'
            },
            {
              'itemCode': '3',
              'itemName': '草稿'
            }
          ]
        },
        {
          'groupKey': 'MarriageStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '续存'
            },
            {
              'itemCode': '2',
              'itemName': '不续存'
            }
          ]
        },
        {
          'groupKey': 'LiveTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '自有全款'
            },
            {
              'itemCode': '2',
              'itemName': '自有贷款'
            },
            {
              'itemCode': '3',
              'itemName': '租赁'
            },
            {
              'itemCode': '9',
              'itemName': '其他'
            }
          ]
        },
        {
          'groupKey': 'BlacklistStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '黑名单'
            },
            {
              'itemCode': '2',
              'itemName': '已恢复白名单'
            }
          ]
        },
        {
          'groupKey': 'UnitTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '国有企业'
            },
            {
              'itemCode': '2',
              'itemName': '国有控股企业'
            },
            {
              'itemCode': '3',
              'itemName': '外资企业'
            },
            {
              'itemCode': '4',
              'itemName': '合资企业'
            },
            {
              'itemCode': '5',
              'itemName': '私营企业'
            },
            {
              'itemCode': '6',
              'itemName': '事业单位'
            },
            {
              'itemCode': '7',
              'itemName': '国家政府机关'
            },
            {
              'itemCode': '8',
              'itemName': '政府'
            }
          ]
        },
        {
          'groupKey': 'DutyEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '高级领导'
            },
            {
              'itemCode': '2',
              'itemName': '中级领导'
            },
            {
              'itemCode': '3',
              'itemName': '一般员工'
            },
            {
              'itemCode': '4',
              'itemName': '其他'
            }
          ]
        },
        {
          'groupKey': 'RelativeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '亲属'
            },
            {
              'itemCode': '2',
              'itemName': '朋友'
            },
            {
              'itemCode': '3',
              'itemName': '同事'
            },
            {
              'itemCode': '4',
              'itemName': '父母'
            },
            {
              'itemCode': '5',
              'itemName': '子女'
            },
            {
              'itemCode': '6',
              'itemName': '兄弟/妹'
            },
            {
              'itemCode': '7',
              'itemName': '同学'
            }
          ]
        },
        {
          'groupKey': 'ContactTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '紧急联系人'
            },
            {
              'itemCode': '2',
              'itemName': '工作证明人'
            },
            {
              'itemCode': '3',
              'itemName': '家庭联系人'
            }
          ]
        },
        {
          'groupKey': 'WarrantTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '个人'
            },
            {
              'itemCode': '2',
              'itemName': '公司'
            }
          ]
        },
        {
          'groupKey': 'MortgageTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '车辆'
            },
            {
              'itemCode': '2',
              'itemName': '房产'
            }
          ]
        },
        {
          'groupKey': 'CreditTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '信用良好'
            },
            {
              'itemCode': '2',
              'itemName': '少数逾期'
            },
            {
              'itemCode': '3',
              'itemName': '多次逾期'
            },
            {
              'itemCode': '4',
              'itemName': '无信用记录'
            }
          ]
        },
        {
          'groupKey': 'MonthRevenueEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '3000元以下'
            },
            {
              'itemCode': '2',
              'itemName': '3000-5000元'
            },
            {
              'itemCode': '3',
              'itemName': '5000-8000元'
            },
            {
              'itemCode': '4',
              'itemName': '8000-12000元'
            },
            {
              'itemCode': '5',
              'itemName': '12000-20000元'
            },
            {
              'itemCode': '5',
              'itemName': '20000元以上'
            }
          ]
        },
        {
          'groupKey': 'HaveNoEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '有'
            },
            {
              'itemCode': '0',
              'itemName': '无'
            }
          ]
        },
        {
          'groupKey': 'HaveCompanyRelativeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '全资'
            },
            {
              'itemCode': '2',
              'itemName': '控股'
            },
            {
              'itemCode': '3',
              'itemName': '持股'
            },
            {
              'itemCode': '4',
              'itemName': '核心经营者'
            },
            {
              'itemCode': '5',
              'itemName': '实际控制人'
            }
          ]
        },
        {
          'groupKey': 'ProductStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '启用'
            },
            {
              'itemCode': '2',
              'itemName': '停用'
            },
            {
              'itemCode': '3',
              'itemName': '初始化'
            }
          ]
        },
        {
          'groupKey': 'ReceiveTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '比例'
            },
            {
              'itemCode': '2',
              'itemName': '金额'
            }
          ]
        },
        {
          'groupKey': 'FeeTypeEnum',
          'items': [
            {
              'itemCode': 'C',
              'itemName': '收入'
            },
            {
              'itemCode': 'D',
              'itemName': '支出'
            }
          ]
        },
        {
          'groupKey': 'ProductTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '乘用车'
            },
            {
              'itemCode': '2',
              'itemName': '商用车'
            },
            {
              'itemCode': '3',
              'itemName': '轻卡'
            },
            {
              'itemCode': '4',
              'itemName': '微卡'
            },
            {
              'itemCode': '5',
              'itemName': '新能源'
            }
          ]
        },
        {
          'groupKey': 'FreedTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '按还本金额释放'
            },
            {
              'itemCode': '2',
              'itemName': '按贷款结清'
            }
          ]
        },
        {
          'groupKey': 'InterestTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '按实际天数计算'
            },
            {
              'itemCode': '2',
              'itemName': '按固定30天计算'
            }
          ]
        },
        {
          'groupKey': 'ModelTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '不算头不算尾'
            },
            {
              'itemCode': '2',
              'itemName': '算头不算尾'
            },
            {
              'itemCode': '3',
              'itemName': '算头又算尾'
            }
          ]
        },
        {
          'groupKey': 'OverdueTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '按合同金额收取'
            },
            {
              'itemCode': '2',
              'itemName': '按应还未还金额收取'
            }
          ]
        },
        {
          'groupKey': 'RepaymentPeriodEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '按日'
            },
            {
              'itemCode': '2',
              'itemName': '按月'
            },
            {
              'itemCode': '3',
              'itemName': '按季'
            },
            {
              'itemCode': '4',
              'itemName': '按半年'
            },
            {
              'itemCode': '5',
              'itemName': '按年'
            },
            {
              'itemCode': '6',
              'itemName': '自定义'
            }
          ]
        },
        {
          'groupKey': 'RepaymentRuleEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '对日还款'
            },
            {
              'itemCode': '2',
              'itemName': '指定日还款'
            }
          ]
        },
        {
          'groupKey': 'RepaymentTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '等额本金'
            },
            {
              'itemCode': '2',
              'itemName': '等额本息'
            },
            {
              'itemCode': '3',
              'itemName': '等本等息'
            },
            {
              'itemCode': '4',
              'itemName': '按期收息，期末收本'
            }
          ]
        },
        {
          'groupKey': 'YearModelEnum',
          'items': [
            {
              'itemCode': '360',
              'itemName': '按360天计算'
            },
            {
              'itemCode': '365',
              'itemName': '按365天计算'
            }
          ]
        },
        {
          'groupKey': 'BizTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '一手车'
            },
            {
              'itemCode': '2',
              'itemName': '二手车'
            }
          ]
        },
        {
          'groupKey': 'CreditFreedTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '按还本金额释放'
            },
            {
              'itemCode': '2',
              'itemName': '按贷款结清'
            },
            {
              'itemCode': '3',
              'itemName': '按权证方式入库'
            }
          ]
        },
        {
          'groupKey': 'CreditAuditStatusEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '有效'
            },
            {
              'itemCode': '2',
              'itemName': '授信申请'
            },
            {
              'itemCode': '3',
              'itemName': '初审'
            },
            {
              'itemCode': '4',
              'itemName': '外审'
            },
            {
              'itemCode': '5',
              'itemName': '审批'
            },
            {
              'itemCode': '6',
              'itemName': '已撤回'
            },
            {
              'itemCode': '7',
              'itemName': '无效'
            },
            {
              'itemCode': '9',
              'itemName': '审核不通过'
            }
          ]
        },
        {
          'groupKey': 'ApproveStatusEnum',
          'items': [
            {
              'itemCode': 'A',
              'itemName': '同意'
            },
            {
              'itemCode': 'R',
              'itemName': '拒绝'
            },
            {
              'itemCode': 'B',
              'itemName': '退回'
            }
          ]
        },
        {
          'groupKey': 'CarInsuranceEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '乙方自行支付保险费'
            },
            {
              'itemCode': '2',
              'itemName': '保险费计入每月租金'
            }
          ]
        },
        {
          'groupKey': 'DqxInsuranceEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '乙方自行支付保险费'
            },
            {
              'itemCode': '2',
              'itemName': '保险费计入每月租金'
            }
          ]
        },
        {
          'groupKey': 'InterestType',
          'items': [
            {
              'itemCode': '1',
              'itemName': '固定利率'
            },
            {
              'itemCode': '2',
              'itemName': '浮动利率'
            }
          ]
        },
        {
          'groupKey': 'OperatingModeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '直接运营模式'
            },
            {
              'itemCode': '2',
              'itemName': '海乐行模式'
            }
          ]
        },
        {
          'groupKey': 'ServiceFeeTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '一次性收取'
            },
            {
              'itemCode': '2',
              'itemName': '分期收取'
            }
          ]
        },
        {
          'groupKey': 'SubsidyTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '全贴'
            },
            {
              'itemCode': '2',
              'itemName': '全不贴'
            }
          ]
        },
        {
          'groupKey': 'SinTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '线上'
            },
            {
              'itemCode': '2',
              'itemName': '线下'
            }
          ]
        },
        // 合同类型
        {
          'groupKey': 'ContractTypeEnum',
          'items': [
            {
              'itemCode': '1',
              'itemName': '抵押合同'
            },
            {
              'itemCode': '2',
              'itemName': '反欺诈风险提示'
            },
            {
              'itemCode': '3',
              'itemName': '付款提示表'
            },
            {
              'itemCode': '4',
              'itemName': '租赁合同(回租)'
            },
            {
              'itemCode': '5',
              'itemName': '协议书（回租模式）'
            },
            {
              'itemCode': '6',
              'itemName': '客户须知与免责声明1'
            },
            {
              'itemCode': '7',
              'itemName': '《重庆海乐行融资租赁有限公司汽车租赁合同》附件一《车辆交接单》'
            },
            {
              'itemCode': '8',
              'itemName': '委托扣款协议'
            },
            {
              'itemCode': '9',
              'itemName': '(直租)接收证明书'
            },
            {
              'itemCode': '10',
              'itemName': '(直租)融资租赁合同'
            },
            {
              'itemCode': '11',
              'itemName': '(直租)租车确认函'
            },
            {
              'itemCode': '12',
              'itemName': '(直租)租金调整通知书'
            }
          ]
        }
      ],
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    }
  }
];
