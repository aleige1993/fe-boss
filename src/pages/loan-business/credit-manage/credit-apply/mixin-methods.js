export default {
  methods: {
    async getCreditDetail(creditLimitNo) {
      const loading = this.$Message.loading('正在初始化页面', 0);
      let resp = await this.$http.post('/credit/find', { creditLimitNo });
      loading();
      if (resp.success) {
        this.$data.applyData = {
          'creditApplyAttachParamList': resp.body.creditApplyAttachList,
          // 申请意见入参
          'creditAuditParam': {
            'approveStatus': 'A',
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
        this.getCreditDetail();
      } else {
        this.$data.applyData = {
          'creditApplyAttachParamList': [],
          // 申请意见入参
          'creditAuditParam': {
            'approveStatus': 'A',
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
      this.$data.applyData.creditApplyParam = company;
      this.$data.applyData.creditApplyAttachParamList = attachFiles;
    },
    // 上传附件
    openAddAttachModal() {
      this.$data.addAttachModal = true;
      this.$data.attachFormData = {
        attachName: '',
        attachUrl: ''
      };
    },
    uploadAttachSuccess(res) {
      this.$data.attachFormData.attachUrl = res.body.url;
    },
    submitAttach() {
      this.$data.applyData.creditApplyAttachParamList.push(this.$data.attachFormData);
      this.$data.addAttachModal = false;
    },
    async submitCreditApply() {
      if (this.$data.applyData.creditApplyParam.corpNo === '') {
        this.$Notice.error({
          desc: '请选择一个公司'
        });
      } else {
        this.$data.submitApplyLoading = true;
        let resp = await this.$http.post('/credit/update', this.$data.applyData);
        this.$data.submitApplyLoading = false;
        if (resp.success) {
          this.$Message.success('提交成功');
          this.$router.push('/index/loanbusiness/credit');
        }
      }
    }
  }
};
