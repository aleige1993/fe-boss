export default {
  data() {
    return {
      initApplyInfoLoading: false,
      memberNo: '',
      member: {},
      uploadFileName: '',
      showSelectProduct: false,
      showSelectObligee: false, // 显示选择权利人的模态框
      showSelectCompanyOwner: false, // 显示选择企业权利人的模态框
      showSelectGua: false,
      showSelectCompanyGua: false,
      showAddLoanFilesModal: false, // 新增贷款材料清单
      showSelectDistributor: false,
      personalBasicInfo: {},
      // 准入规则
      accessRuleCol: [
        {
          title: '准入规则',
          key: 'loanApproveName'
        },
        {
          title: '系统筛查意见',
          key: 'sysProcessOpinion'
        },
        {
          title: '初审意见',
          key: 'status',
          render: (h, params) => {
            return h('i-select', {
              props: {
                disabled: this.readonly,
                value: params.row.status
              },
              on: {
                'on-change': (value) => {
                  let rowData = { ...params.row };
                  rowData.status = value;
                  this.$data.loanApproveRuleDTOS[params.index] = rowData;
                }
              }
            }, this.enumSelectData.get('ApproveRuleEnum').map((item) => {
              return h('i-option', {
                props: {
                  label: item.itemName,
                  value: item.itemCode
                }
              });
            }));
          }
        }
      ],
      'loanApproveRuleDTOS': [],
      // 车辆
      isAddCar: true,
      showModalCar: false,
      // 车辆信息 -- 评估报告
      showCarEvalFormModal: false,
      isAddCarEval: true,
      modifyCarEvalRowIndex: 0,
      carDataLoading: false,
      carEvalColumns: [
        {
          title: '第三方评估商名称',
          key: 'evalProviderName'
        },
        {
          title: '车况',
          width: 120,
          key: 'evalGrade',
          render: (h, params) => {
            // console.log(this.$store.getters.enumSelectData.get('CarConditionEnum'));
            return h('span', {}, this.enumCode2Name(params.row.evalGrade, 'CarConditionEnum'));
          }
        },
        {
          title: '车型',
          key: 'carModel'
        },
        {
          title: '车商收购价(万元)',
          key: 'merchantBuyAmt'
        },
        {
          title: '车商售卖价(万元)',
          key: 'merchantSaleAmt'
        },
        {
          title: '个人交易价(万元)',
          key: 'individualSaleAmt'
        }
        /* {
          title: '抵押估价',
          key: 'guarantyAmt'
        },
        {
          title: '质押估价',
          key: 'pledgeAmt'
        },
        {
          title: '评估方式',
          key: 'evalType',
          render: (h, params) => {
            return params.row.evalType === '1' ? '手工' : '自动';
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$data.isAddCarEval = false;
                    this.$data.showCarEvalFormModal = true;
                    this.$data.formCarEval = Object.assign({}, params.row);
                    this.$data.modifyCarEvalRowIndex = params.index;
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    Alertify.confirm('确定要删除当前评估信息吗？', ok => {
                      if (ok) {
                        this.$data.formCar.loanCarEvalDTOList.splice(params.index, 1);
                      }
                    });
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }*/
      ],
      formCar: {
        carOutputStand: '',
        loanNo: '',
        carGuaCount: '',
        remark: '',
        carBuyPrice: '',
        carEngineNo: '',
        carRegNo: '',
        carCertNo: '',
        carColor: '',
        carOnCity: '',
        carOwnerNo: '',
        carGuidePrice: '',
        billNo: '',
        carTypeName: '',
        carOwnerName: '',
        carIsFault: '',
        carStatus: '',
        carPlateNo: '',
        carBirthday: '',
        carTransferCount: '',
        carIsAnchored: '',
        carBrandCode: '',
        carOnDate: '',
        carVendor: '',
        carBrandName: '',
        billAmt: '',
        carEvaluatePrice: '',
        guaranteeType: '',
        isTmpPlate: '',
        carOutputVolume: '',
        custType: '',
        carTypeCode: '',
        carIsPubPlate: '',
        carFrameNo: '',
        carMileage: '',
        carModel: '',
        carModelName: '',
        billCorpName: '',
        loanCarEvalDTOList: [] // 车辆评估信息
      },
      formCarEval: {
        'loanCarNo': '', // 抵押车辆编号
        'loanNo': '', // 项目编号
        'evalProviderNo': '', // 第三方评估商编号
        'evalProviderName': '', // 第三方评估商名称
        'guarantyAmt': '', // 抵押估价
        'pledgeAmt': '', // 质押估价
        'merchantBuyAmt': '', // 车商收购价
        'merchantSaleAmt': '', // 车商售卖价
        'individualSaleAmt': '', // 个人交易价
        'evalType': '' // 评估方式1-手工，2-自动
      },
      // 担保信息
      isAddAssure: true,
      assureDataLoading: false,
      showModalAssure: false,
      formAssure: {
        guaPersonMobile: '',
        guaPersonName: '',
        guaPersonCertType: '',
        loanNo: '',
        guaPersonType: '',
        guaPersonCertNo: '',
        guaType: '',
        remark: '',
        guaPersonNo: '',
        guaPersonAddr: '',
        relation: ''
      },
      // 贷款材料
      isAddLoan: true,
      showModalLoan: false,
      loanDataLoading: false,
      formLoan: {
        attachPath: '',
        loanDocCode: '',
        loanNo: '',
        remark: '',
        loanDocName: '',
        status: ''
      },
      showBasicList: true, // 当选择客户姓名之后就显示以下的相关信息
      isFromDetail: false,
      showSelectCustomer: false,
      formData: {
        // id: 29, // 如果是编辑
        carBuyAmt: '', // 车辆购车价格
        deptName: '', // 业务归属部门名称
        certType: '', // 证件类型
        loanNo: '', // 项目编号 如果是编辑
        taskAssigneeName: '', // 任务签收人姓名
        taskArriveTime: '', // 任务送达时间
        memberName: '', // 客户名称
        // corpNo: '', // 公司编号
        productName: '', // 产品名称
        deptNo: '', // 业务归属部门ID
        deptCooperationStartDate: '', // 业务部门合作开始时间
        carType: '', // 车类型，1-一手车；2-二手车
        // creditCode: '', // 公司社会统一信用代码
        applyPeriods: '', // 申请期数
        depositOrDownPayment: '', // 首付或保证金
        custManagerName: '', // 客户经理名称
        custKind: '', // 客户性质1-新增客户2-结清再贷
        applyTime: '', // 贷款申请时间
        productType: '', // 产品类别，1-乘用车，2-商用车，3-轻卡，4微卡
        productNo: '', // 产品编号
        loanUse: '', // 贷款用途
        carUse: '', // 车辆用途1-自用2-指定第三方自用3-商用
        // corpName: '', // 公司名称
        mobileNo: '', // 手机号码
        taskNode: '', // 任务节点
        guaMethod: '', // 担保方式1-个人担保2-夫妻担保3-直系亲属担保
        applyAmt: '', // 申请金额
        custManagerNo: '', // 客户经理ID
        memberNo: '', // 客户编号
        certNo: '', // 证件号码
        loanChannel: '3', // 项目来源;1-Android,2-IOS,3-Web(后台手工录入),4-TX(泰象)
        custType: '1', // 客户类型1-个人客户2-公司客户
        taskAssignee: '', // 任务签收人
        status: '', // 状态0-未处理1-处理中2-已处理,3-草稿,9-废弃
        applyAddress: '',
        longitude: '',
        latitude: '',
        custLevel: '',
        loandType: '',
        merchantNo: '',
        merchantAbbr: '',
        channelNo: '',
        channelName: '',
        rejectCause: '',
        result: '', // 申请意见 通过 拒绝 退回 废弃
        opinin: '' // 申请意见详情
      }
    };
  }
};
