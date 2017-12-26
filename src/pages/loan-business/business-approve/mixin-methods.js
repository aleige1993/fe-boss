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
    // 提交审批
    async submitLoanApprove() {
      console.log(this.$refs['applyInfo'].$data);
    }
  }
};
