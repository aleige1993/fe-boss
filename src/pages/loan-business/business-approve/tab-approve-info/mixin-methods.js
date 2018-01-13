export default {
  methods: {
    uploadFirstApproveFileSuccess(res) {
      this.$set(this.$data.firstApproveForm, 'resultPath', res.body.url);
      this.$set(this.$data.firstApproveForm, 'resultFileName', res.body.fileName);
      // this.$data.firstApproveForm.fileUrl = res.body.url;
    },
    /**
     * 提交审批
     */
    submitFirstApprove() {
      this.$refs['addFirstApproveForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.loanApproveFirstDTOS.push(this.$data.firstApproveForm);
          this.$data.addFirstApproveModal = false;
        }
      });
    },
    /**
     * 提交放款条件
     */
    submitCondition() {
      this.$refs['addConditionForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.loanPaymentConditionDTOS.push(this.$data.conditionForm);
          this.$data.addConditionModal = false;
        }
      });
    },
    /**
     * 判断是否有选择的行的应收金额没填
     */
    hasFinanceAmtInvalid(dataList) {
      let invalid = false;
      dataList.forEach((item, index) => {
        if (item.calcAmt === '') {
          invalid = true;
        }
      });
      return invalid;
    },
    /**
     * 计算可融资金额
     */
    async countFinanceAmount() {
      let selection = this.$refs['feeMethodsTable'].getSelection();
      let selectData = selection.map(item => {
        return {
          calcAmt: item.feeActualAmt || '',
          calcSign: item.calcSign || '+'
        };
      });
      if (selectData.length === 0) {
        this.$Notice.error({
          title: '错误提示',
          desc: '请先至少选择一条费用收取方案'
        });
      } else if (this.hasFinanceAmtInvalid(selectData)) {
        this.$Notice.error({
          title: '错误提示',
          desc: '请先填写所选项的应收金额'
        });
      } else {
        this.$data.countFinanceLoading = true;
        let resp = await this.$http.post('/biz/countFinancingAmt', this.$data.countFinanceList);
        this.$data.countFinanceLoading = false;
        if (resp.success) {
          this.$data.approveData.loanApproveCreditDTO.carSaleAmt = resp.body.financingAmt;
        }
      }
    },
    /**
     * 用信方案选择产品
     * @param row
     * @param index
     */
    selectProduct(row, index) {
      // console.log(row);
      this.$data.approveData.loanApproveCreditDTO.productNo = row.productNo;
      this.$data.approveData.loanApproveCreditDTO.productName = row.productName;
      // this.$data.formData.productType = row.productType;
      this.$data.showSelectProduct = false;
    },
    /**
     * 一级审批和二级审批状态 -- 获取初审信息
     */
    async getFirstApproveInfo(loanNo) {
      this.$data.initPageLoading = true;
      let approveRulePromise = this.$http.post('/biz/listApproveRule', { loanNo }); // 准入规则
      let paymentConditionPromise = this.$http.post('/biz/getPaymentCondition', { loanNo }); // 放款条件
      let approveCreditPromise = this.$http.post('/biz/getApproveCredit', { loanNo }); // 用信方案
      let approveFeePlanPromise = this.$http.post('/biz/listApproveFeePlan', { loanNo }); // 费用收取方案列表
      let approveRuleResp = await approveRulePromise;
      let paymentConditionResp = await paymentConditionPromise;
      let approveCreditResp = await approveCreditPromise;
      let approveFeePlanResp = await approveFeePlanPromise;
      this.$data.initPageLoading = false;
      if (approveRuleResp.success) {
        this.$data.approveData.loanApproveRuleDTOS = approveRuleResp.body;
      }
      if (paymentConditionResp.success) {
        this.$data.approveData.loanPaymentConditionDTOS = paymentConditionResp.body.resultList;
      }
      if (approveCreditResp.success) {
        this.$data.approveData.loanApproveCreditDTO = approveCreditResp.body;
      }
      if (approveFeePlanResp.success) {
        this.$data.approveData.loanApproveFeePlanDTOS = approveFeePlanResp.body;
      }
    },
    async getFirstApproveList(loanNo) {
      let firstApproveListResp = await this.$http.post('/biz/listApproveFirst', { loanNo }); // 初审信息
      if (firstApproveListResp.success) {
        this.$data.approveData.loanApproveFirstDTOS = firstApproveListResp.body;
      }
    },
    /**
     * 初审状态 -- 根据申请编号和产品编号，产品期数获取审批初始化信息
    */
    async getProductApproveInfo(loanNo, productNo, productPeriods) {
      this.$data.initPageLoading = true;
      let resp = await this.$http.post('/biz/queryApproveProductCredit', {
        productNo,
        loanNo,
        productPeriods,
        applyAmt: '' // 申请金额
      });
      this.$data.initPageLoading = false;
      if (resp.success) {
        let result = resp.body;
        // 准入规则
        this.$data.approveData.loanApproveRuleDTOS = result.tmLoanApproveRuleDTOList;
        // 费用收取方案
        this.$data.approveData.loanApproveFeePlanDTOS = result.tmLoanApproveFeePlanDTOList;
        // 放款条件
        this.$data.approveData.loanPaymentConditionDTOS = result.loanPaymentConditionDTOList;
        // 资方
        this.$data.approveData.loanCapitalDTOS = result.loanProductCapitalDTOList;
        // 用信方案
        this.$data.approveData.loanApproveCreditDTO = {
          'loanPeriods': result.loanPeriods,
          'loanRealRate': result.loanRealRate,
          'capitalNo': '',
          'loanNominalRate': result.loanNominalRate || '12',
          'productName': result.productName,
          'capitalName': '',
          'interestType': result.interestType,
          'carInsurance': result.carInsurance,
          'approveLimitAmt': result.approveLimitAmt,
          'dqxInsurance': result.dqxInsurance,
          'loanApplyUse': result.loanApplyUse,
          productNo,
          'loanRealUse': result.loanRealUse,
          'operatingMode': result.operatingMode,
          'riskControlContent': result.riskControlContent,
          'remark': result.riskControlContent,
          'repaymentMode': result.repaymentMode,
          'loanMode': result.repaymentMode,
          'carSaleAmt': result.carSaleAmt || '0'
        };
      }
    },
    /**
     * 初审状态 -- 获取放款和还款银行账户列表
     * @param meberId 账户ID
     * @param memberType 账户类型 个人客户；企业客户或者渠道商
     * @returns {Promise.<void>}
     */
    async getBankList() {
      let loanNo = this.$route.query.id;
      let paymentCustNo = '';
      if (this.$data.approveData.loanApproveCreditDTO.loanMode === '1') {
        paymentCustNo = this.applyBasicInfo.merchantNo || '110041';
      } else {
        paymentCustNo = this.applyBasicInfo.memberNo || this.applyBasicInfo.corpNo;
      }
      let resp = await this.$http.post('/biz/queryCustLoanAccount', {
        loanNo,
        custNo: this.applyBasicInfo.memberNo || this.applyBasicInfo.corpNo, // 客户编号
        custType: this.applyBasicInfo.custType, // 客户类型 CustTypeEnum
        loanMode: this.$data.approveData.loanApproveCreditDTO.loanMode, // 放款方式 LoanModeEnum
        paymentCustNo // 放款客户编号，LoanModeEnum=1时，传渠道商编号，LoanModeEnum=2时传客户编号
      });
      if (resp.success) {
        this.$data.approveData.loanPaymentAccountDTOS.acctName = resp.body.paymentAccountName;
        this.$data.approveData.loanPaymentAccountDTOS.acctNo = resp.body.paymentAcctNo;
        this.$data.approveData.loanPaymentAccountDTOS.bankName = resp.body.paymentBankName;
        this.$data.approveData.loanRePaymentAccountDTOS.acctName = resp.body.repaymentAccountName;
        this.$data.approveData.loanRePaymentAccountDTOS.acctNo = resp.body.repaymentAcctNo;
        this.$data.approveData.loanRePaymentAccountDTOS.bankName = resp.body.repaymentBankName;
        this.$data.paymentAccountList = resp.body.paymentAccountList;
        this.$data.repaymentAccountList = resp.body.repaymentAccountList;
      }
    },
    /**
     * 根据产品NO获取贷款期限
     * @param productNo
     * @returns {Promise.<void>}
     */
    async getLoanPeriodByProductNo(productNo) {
      let resp = await this.$http.get('/pms/product/findProductByProNo', { productNo });
      if (resp.success) {
        this.$data.loanPeriodsList = resp.body;
      }
    },
    /**
     * 收款账户选择
     * @param val
     */
    paymentAccountChange(val) {
      let filterAry = this.$data.paymentAccountList.filter(item => {
        return item.acctNo === val.label;
      });
      this.$data.approveData.loanPaymentAccountDTOS.acctNo = filterAry[0].acctNo;
      this.$data.approveData.loanPaymentAccountDTOS.bankName = filterAry[0].bankName;
      this.$data.approveData.loanPaymentAccountDTOS.bankCode = filterAry[0].bankCode;
    },
    repaymentAccountChange(val) {
      let filterAry = this.$data.repaymentAccountList.filter(item => {
        return item.acctNo === val.label;
      });
      this.$data.approveData.loanRePaymentAccountDTOS.acctNo = filterAry[0].acctNo;
      this.$data.approveData.loanRePaymentAccountDTOS.bankName = filterAry[0].bankName;
      this.$data.approveData.loanRePaymentAccountDTOS.bankCode = filterAry[0].bankCode;
    },
    /**
     * 表单验证
     */
    validate() {
      let _valid = false;
      this.$refs['busApproveForm'].validate((valid) => {
        if (!valid) {
          this.$Notice.error({
            title: '错误提示',
            desc: '请先完善审批信息'
          });
        }
        _valid = valid;
      });
      return _valid;
    },
    /**
     * 获取审批数据
     */
    getApproveData() {
      return this.$data.approveData;
    }
  }
};
