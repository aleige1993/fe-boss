export default {
  methods: {
    async initPage() {
      let creditLimitApplyNo = this.$route.query.id;
      this.$data.loadingPage = true;
      let resp = await this.$http.post('/credit/listCreditPlan', { creditLimitApplyNo });
      this.$data.loadingPage = false;
      if (resp.success) {
        this.$data.planList = resp.body;
      }
    }
  }
};
