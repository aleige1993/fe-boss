export default {
  methods: {
    async getCreditDetail(creditLimitNo) {
      const loading = this.$Message.loading('正在初始化页面', 0);
      let resp = await this.$http.post('/credit/find', { creditLimitNo });
      loading();
      if (resp.success) {
        this.$data.companyAttachFiles = resp.body.creditApplyAttachList;
        this.$data.approveData = {
          // 'creditApplyAttachParamList': ,
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
          },
          firstTrialParam: {
            'netApprove': resp.body.firstTrialDTO.netApprove || '',
            'telephoneApprove': resp.body.firstTrialDTO.netApprove || '',
            'creditCheckItemsList': resp.body.firstTrialDTO.creditCheckItemsList || []
          },
          creditCheckItemsList: resp.body.externalAuditDTOList,
          creditPlanParam: {
            'currentLimitAmt': '',
            'totalLimitAmt': '',
            'startDate': '',
            'singleLimitAmt': '',
            'creditLimitReleaseMode': '',
            'endDate': ''
          }
        };
      }
    },
    initPage() {
      let _creditLimitNo = this.$route.query.id;
      if (_creditLimitNo) {
        this.getCreditDetail(_creditLimitNo);
      } else {
        this.$data.approveData = {
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
    // 初审添加
    uploadFirstApproveFileSuccess(res) {
      this.$set(this.$data.firstApproveForm, 'fileUrl', res.body.url);
      // this.$data.firstApproveForm.fileUrl = res.body.url;
    },
    submitFirstApprove() {
      this.$refs['addFirstApproveForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.firstTrialParam.creditCheckItemsList.push(this.$data.firstApproveForm);
          this.$data.addFirstApproveModal = false;
        }
      });
    },
    // 外审添加
    uploadOutApproveFileSuccess(res) {
      this.$set(this.$data.outApproveForm, 'fileUrl', res.body.url);
    },
    submitOutApprove() {
      this.$refs['addOutApproveForm'].validate(valid => {
        if (valid) {
          this.$data.approveData.creditCheckItemsList.push(this.$data.outApproveForm);
          this.$data.addOutApproveModal = false;
        }
      });
    },
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
      this.$data.submitApplyLoading = true;
      let resp = await this.$http.post(this.submitUrl, this.$data.approveData);
      this.$data.submitApplyLoading = false;
      if (resp.success) {
        this.$Message.success('提交成功');
        this.$router.push('/index/loanbusiness/credit');
      }
    }
  }
};
