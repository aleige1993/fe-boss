export default {
  data() {
    return {
      initApplyInfoLoading: false,
      memberNo: '',
      corpNo: '',
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
      // 车辆
      isAddCar: true,
      showModalCar: false,
      carDataLoading: false,
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
        billCorpName: ''
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
        corpNo: '', // 公司编号
        productName: '', // 产品名称
        deptNo: '', // 业务归属部门ID
        deptCooperationStartDate: '', // 业务部门合作开始时间
        carType: '', // 车类型，1-一手车；2-二手车
        creditCode: '', // 公司社会统一信用代码
        applyPeriods: '', // 申请期数
        depositOrDownPayment: '', // 首付或保证金
        custManagerName: '', // 客户经理名称
        custKind: '', // 客户性质1-新增客户2-结清再贷
        applyTime: '', // 贷款申请时间
        productType: '', // 产品类别，1-乘用车，2-商用车，3-轻卡，4微卡
        productNo: '', // 产品编号
        loanUse: '', // 贷款用途
        carUse: '', // 车辆用途1-自用2-指定第三方自用3-商用
        corpName: '', // 公司名称
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
        apply_address: '',
        longitude: '',
        latitude: '',
        merchantNo: '',
        merchantAbbr: ''
      }
    };
  }
};
