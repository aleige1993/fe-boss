export default {
  methods: {
    async getCreditDetail(creditLimitApplyNo) {
      const loading = this.$Message.loading('正在初始化页面', 0);
      let resp = await this.$http.post('/credit/find', { creditLimitApplyNo });
      loading();
      if (resp.success) {
        this.$data.applyData = {
          // 'creditApplyAttachParamList': resp.body.creditApplyAttachList,
          // 申请意见入参
          'creditAuditParam': {
            'approveStatus': '',
            'opinion': ''
          },
          // 授信申请信息
          'creditApplyParam': {
            'creditCode': resp.body.creditCode,
            'corpNo': resp.body.corpNo,
            'corpName': resp.body.corpName,
            'creditLimitNo': resp.body.creditLimitNo
          }
        };
      }
    },
    initPage() {
      let _creditLimitNo = this.$route.query.id;
      if (_creditLimitNo) {
        this.getCreditDetail(_creditLimitNo);
      } else {
        this.$data.applyData = {
          // 'creditApplyAttachParamList': [],
          // 申请意见入参
          'creditAuditParam': {
            'approveStatus': '',
            'opinion': ''
          },
          // 授信申请信息
          'creditApplyParam': {
            'creditCode': '',
            'corpNo': '',
            'corpName': '',
            'creditLimitNo': null
          }
        };
      }
    },
    selectCompany(company, attachFiles) {
      this.$data.applyData.creditApplyParam.creditCode = company.creditCode;
      this.$data.applyData.creditApplyParam.corpNo = company.corpNo;
      this.$data.applyData.creditApplyParam.corpName = company.corpName;
      // this.$data.applyData.creditApplyAttachParamList = attachFiles;
    },
    async submitCreditApply() {
      if (this.$data.applyData.creditApplyParam.corpNo === '') {
        this.$Notice.error({
          title: '错误提示',
          desc: '请选择一个公司'
        });
      } else {
        this.$data.submitApplyLoading = true;
        let resp = await this.$http.post('/credit/apply', this.$data.applyData);
        this.$data.submitApplyLoading = false;
        if (resp.success) {
          this.$Message.success('提交成功');
          this.$router.push('/index/loanbusiness/credit');
        }
      }
    }
  }
};
