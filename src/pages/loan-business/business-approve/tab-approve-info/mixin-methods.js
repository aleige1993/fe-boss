export default {
  methods: {
    uploadFirstApproveFileSuccess(res) {
      this.$set(this.$data.firstApproveForm, 'fileUrl', res.body.url);
      this.$set(this.$data.firstApproveForm, 'fileName', res.body.fileName);
      // this.$data.firstApproveForm.fileUrl = res.body.url;
    },
    submitFirstApprove() {
      this.$refs['addFirstApproveForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.loanApproveFirstDTOS.push(this.$data.firstApproveForm);
          this.$data.addFirstApproveModal = false;
        }
      });
    },
    // 提交放款条件
    submitCondition() {
      this.$refs['addConditionForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.loanPaymentConditionDTOS.push(this.$data.conditionForm);
          this.$data.addConditionModal = false;
        }
      });
    },
    // 用信方案选择产品
    selectProduct(row, index) {
      console.log(row);
      this.$data.approveData.loanApproveCreditDTO.productNo = row.productNo;
      this.$data.approveData.loanApproveCreditDTO.productName = row.productName;
      // this.$data.formData.productType = row.productType;
      this.$data.showSelectProduct = false;
    },
    // 获取产品准入规则
    async getProductAllowRule(productNo) {
      let resp = await this.$http.get('/pms/product/approveRuleList', {
        productNo
      });
      if (resp.success) {
        let result = resp.body.filter(item => {
          return item.isSelected;
        });
        let ary = [];
        result.map(item => {
          ary.push({
            'loanApproveCode': item.approveRuleCode,
            'loanApproveName': item.approveRuleName,
            'sysProcessOpinion': '1',
            'status': '1'
          });
        });
        this.$data.approveData.loanApproveRuleDTOS = ary;
      }
    },
    // 获取产品费用收取方案
    async getProductFeeMethods(productNo) {
      let resp = await this.$http.get('/pms/productFeeDetail/queryByProductNo', {
        productNo
      });
      if (resp.success) {
        console.log(resp.body);
        let result = resp.body.resultList.filter(item => {
          return true;
        });
        let ary = [];
        result.map(item => {
          ary.push({
            'feeId': item.feeTypeNo,
            'feeAmt': item.fixedAmount,
            'feeName': item.feeTypeName,
            'feeTakeType': item.incomeType,
            'feePercent': '',
            'feeActualAmt': '',
            'remark': '',
            'feeCountType': ''
          });
        });
        this.$data.approveData.loanApproveFeePlanDTOS = ary;
      }
    }
  }
};
