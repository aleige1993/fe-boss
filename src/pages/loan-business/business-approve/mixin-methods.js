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
      let vmApplyInfo = this.$refs['applyInfo'];
      let vmApproveInfo = this.$refs['approveInfo'];
      let applyData = {};
      let approveData = {};
      alert(vmApplyInfo.validate());
      if (vmApplyInfo.validate()) {
        applyData = vmApplyInfo.getApplyData();
        if (vmApproveInfo.validate()) {
          approveData = vmApproveInfo.getApproveData();
          this.$data.submitApproveLoading = true;
          const loading = this.$Message.loading('正在提交审批...', 0);
          let resp = await this.$http.post('/biz/saveLoanApprove', $.extend({ opeType: '2' }, applyData, approveData));
          this.$data.submitApproveLoading = false;
          loading();
          if (resp.success) {
            this.$Message.success('审批成功');
          }
        }
      }
      // console.log($.extend({}, applyData, approveData));
    }
  }
};
