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
      for (let item of dataList) {
        if (item.calcAmt === '') {
          invalid = true;
        }
      }
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
        return;
      }
      if (this.hasFinanceAmtInvalid(selectData)) {
        this.$Notice.error({
          title: '错误提示',
          desc: '请先填写所选项的应收金额'
        });
        return;
      }
      this.$data.countFinanceLoading = true;
      let resp = await this.$http.post('/biz/countFinancingAmt', {
        countFinancingAmtReqVOS: selectData,
        carBuyAmt: this.applyBasicInfo.carBuyAmt
      });
      this.$data.countFinanceLoading = false;
      if (resp.success) {
        this.$data.approveData.loanApproveCreditDTO.carSaleAmt = resp.body.financingAmt;
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
      this.$data.approveData.loanApproveCreditDTO.productPackageNo = row.productPackageNo;
      // this.$data.formData.productType = row.productType;
      this.$data.showSelectProduct = false;
      this.getLoanPeriodByProductNo(row.productPackageNo, row.custLevel);
    },
    /**
     * 一级审批和二级审批状态 -- 获取初审信息    ---这个接口暂时废弃
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
    // ReqDataObj={ loanNo, productNo, productPeriods, carBuyAmt, custLevel, carType }
    async getProductApproveInfo(ReqDataObj) {
      this.$data.initPageLoading = true;
      let resp = await this.$http.post('/biz/queryApproveProductCredit', {
        productNo: ReqDataObj.productNo,
        loanNo: ReqDataObj.loanNo,
        productPeriods: ReqDataObj.productPeriods,
        carBuyAmt: ReqDataObj.carBuyAmt,
        custLevel: ReqDataObj.custLevel,
        carType: ReqDataObj.carType,
        custType: this.applyBasicInfo.custType || '', // 客户类型
        applyAmt: this.applyBasicInfo.applyAmt || '' // 申请金额
      });
      this.$data.initPageLoading = false;
      if (resp.success) {
        let result = resp.body;
        // console.log(JSON.stringify(result));
        // 准入规则  (已经移到申请信息中)
        // this.$data.approveData.loanApproveRuleDTOS = result.tmLoanApproveRuleDTOList;
        // 费用收取方案
        let tmLoanApproveFeePlanDTOList = result.tmLoanApproveFeePlanDTOList;
        // 费用收取方案 转换字段--实际费用金额
        if (tmLoanApproveFeePlanDTOList && tmLoanApproveFeePlanDTOList.length > 0) {
          this.$data.approveData.loanApproveFeePlanDTOS = tmLoanApproveFeePlanDTOList;
        }
        // 放款条件
        this.$data.approveData.loanPaymentConditionDTOS = result.loanPaymentConditionDTOList;
        // 资方
        this.$data.approveData.loanCapitalDTOS = result.loanProductCapitalDTOList;
        // 资方 转换字段--放款比例
        let loanRateSum = 0;
        let tmLoanCapitalDTOS = result.loanProductCapitalDTOList;
        if (tmLoanCapitalDTOS && tmLoanCapitalDTOS.length > 0) {
          this.$data.approveData.loanCapitalDTOS.map((item) => {
            item.loanRatio = item.paymentPercent;
            loanRateSum += parseFloat(item.loanRate);
          });
        }
        this.$data.loanRateSumProuductRate = loanRateSum;
        // 产品套餐编号
        this.$data.productPackageNo = result.productPackageNo;
        // 用信方案
        this.$data.approveData.loanApproveCreditDTO = {
          'productPackageNo': result.productPackageNo, // 产品套餐编号
          'productPackageName': result.productPackageName,
          'loanPeriods': result.loanPeriods,
          'loanRealRate': result.loanRealRate,
          'capitalNo': '',
          // 产品利率=定收利率+资金方信息的资方借款利率 （loanProductRate产品利率仅作展示用）
          'loanProductRate': this.$data.loanRateSumProuductRate + (this.$data.approveData.loanApproveCreditDTO.loanRealRate / 1),
          'loanNominalRate': result.loanNominalRate || '12',
          'productName': result.productName,
          'capitalName': '',
          'interestType': result.interestType,
          'carInsurance': result.carInsurance,
          'approveLimitAmt': result.approveLimitAmt,
          'dqxInsurance': result.dqxInsurance,
          'loanApplyUse': result.loanApplyUse,
          'productNo': ReqDataObj.productNo,
          'loanRealUse': result.loanRealUse,
          'operatingMode': result.operatingMode,
          'riskControlContent': result.riskControlContent,
          'remark': result.riskControlContent,
          'repaymentMode': result.repaymentMode,
          'loanMode': result.loanMode,
          'carSaleAmt': result.carSaleAmt || '0',
          'isNeedGps': result.isNeedGps
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
        paymentCustNo = this.applyBasicInfo.merchantNo || '';
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
        this.$data.approveData.loanPaymentAccountDTOS.openBankName = resp.body.paymentBankName;
        this.$data.approveData.loanRePaymentAccountDTOS.acctName = resp.body.repaymentAccountName;
        this.$data.approveData.loanRePaymentAccountDTOS.acctName = resp.body.repaymentAccountName;
        this.$data.approveData.loanRePaymentAccountDTOS.acctNo = resp.body.repaymentAcctNo;
        this.$data.approveData.loanRePaymentAccountDTOS.bankName = resp.body.repaymentBankName;
        this.$data.approveData.loanRePaymentAccountDTOS.openBankName = resp.body.repaymentBankName;
        this.$data.paymentAccountList = resp.body.paymentAccountList;
        this.$data.repaymentAccountList = resp.body.repaymentAccountList;
      }
    },
    /**
     * 根据产品套餐编号和客户等级获取贷款期限
     * @param productPackageNo,custLevel
     * @returns {Promise.<void>}
     */
    async getLoanPeriodByProductNo(productPackageNo, custLevel) {
      let resp = await this.$http.get('/pms/product/findProductByProNo', {
        productPackageNo,
        custLevel
      });
      // console.log(resp);
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
     * 选择利率方案
     * @param row
     * @param index
     */
    selectPeriodsRow(row, index) {
      this.$data.approveData.loanApproveCreditDTO.loanPeriods = row.loanPeriods;
      this.$data.approveData.loanApproveCreditDTO.loanNominalRate = row.loanNominalRate;
      this.$data.approveData.loanApproveCreditDTO.interestType = row.interestType;
      this.$data.selectPeriodsAndRate = false;
    },
    /**
     * 表单验证
     */
    validate() {
      let _valid = false;
      if (this.$data.approveData.loanApproveDTO.result !== 'A') {
        _valid = true;
      } else {
        this.$refs['busApproveForm'].validate((valid) => {
          if (!valid) {
            this.$Notice.error({
              title: '错误提示',
              desc: '请先完善审批信息'
            });
          }
          _valid = valid;
        });
      }
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
