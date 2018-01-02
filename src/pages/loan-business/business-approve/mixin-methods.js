export default {
  methods: {
    async initPage() {
      let loanNo = this.$route.query.id;
      if (loanNo) {
        let resp = await this.$http.post('/biz/getLoanBizByLoanNo', {
          loanNo
        });
        if (resp.success) {
          this.$data.formData = resp.body;
        }
      }
    },
    /**
     * 提交审批
    */
    async submitLoanApprove() {
      let submitUrl = '';
      let loanNode = this.$route.query.status;
      if (loanNode === '3') {
        submitUrl = '/biz/saveLoanApprove';
      } else if (loanNode === '4') {
        submitUrl = '/biz/saveFirstApprove';
      } else {
        submitUrl = '/biz/saveSecondApprove';
      }
      let vmApplyInfo = this.$refs['applyInfo'];
      let vmApproveInfo = this.$refs['approveInfo'];
      let applyData = {};
      let approveData = {};
      alert(vmApplyInfo.validate());
      if (vmApplyInfo.validate()) {
        applyData = vmApplyInfo.getApplyData();
        let approveInfoValid = true;
        approveData = vmApproveInfo.getApproveData();
        if (approveData.loanApproveDTO.result === 'A') {
          approveInfoValid = vmApproveInfo.validate();
        }
        if (approveInfoValid) {
          // approveData = vmApproveInfo.getApproveData();
          this.$data.submitApproveLoading = true;
          const loading = this.$Message.loading('正在提交审批...', 0);
          let submitData = {};
          if (loanNode === '3') {
            submitData = $.extend({ opeType: '2' }, applyData, approveData);
          } else {
            submitData = {
              loanNo: applyData.loanVO.loanNo,
              loanApproveDTO: approveData.loanApproveDTO
            };
          }
          let resp = await this.$http.post(submitUrl, submitData);
          this.$data.submitApproveLoading = false;
          loading();
          if (resp.success) {
            this.$Message.success('审批成功');
          }
        }
      }
    }
  }
};
