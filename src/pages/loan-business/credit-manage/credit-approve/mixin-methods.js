export default {
  methods: {
    async getCreditDetail(creditLimitNo) {
      const loading = this.$Message.loading('正在初始化页面', 0);
      let resp = await this.$http.post('/credit/find', { creditLimitApplyNo: creditLimitNo });
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
            'creditLimitApplyNo': resp.body.creditLimitApplyNo
          },
          firstTrialParam: {
            'netApprove': resp.body.firstTrialDTO.netApprove || '',
            'telephoneApprove': resp.body.firstTrialDTO.netApprove || '',
            'creditCheckItemsList': resp.body.firstTrialDTO.creditCheckItemsList || []
          },
          creditCheckItemsList: resp.body.externalAuditDTOList,
          creditLimitParam: resp.body.creditLimit || {
            // 'currentLimitAmt': '',
            'totalLimitAmt': '',
            'startDate': '',
            // 'singleLimitAmt': '',
            'creditLimitReleaseMode': '',
            'endDate': ''
          },
          creditPlanList: resp.body.creditPlanList || this.$data.approveData.creditPlanList
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
            'creditLimitApplyNo': null
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
      this.$set(this.$data.firstApproveForm, 'fileName', res.body.fileName);
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
      this.$set(this.$data.outApproveForm, 'fileName', res.body.fileName);
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
      this.$data.attachFormData.attachName = res.body.fileName;
    },
    submitAttach() {
      this.$data.applyData.creditApplyAttachParamList.push(this.$data.attachFormData);
      this.$data.addAttachModal = false;
    },
    // 添加用信方案
    saveCreditPlan(creditPlan) {
      this.$data.addCreditPlamModal = false;
      if (this.$data.creditPlanFormEdit) {
        this.$set(this.$data.approveData.creditPlanList, this.$data.creditPlanEditIndex / 1, creditPlan);
      } else {
        this.$data.approveData.creditPlanList.push(creditPlan);
      }
    },
    async saveCreditApproveInfo() {
      this.$data.submitApplyLoading = true;
      let resp = await this.$http.post(this.submitUrl, this.$data.approveData);
      this.$data.submitApplyLoading = false;
      if (resp.success) {
        this.$Message.success('提交成功');
        this.$router.push('/index/loanbusiness/credit');
      }
    },
    submitCreditApply() {
      let approveStatus = this.$data.approveData.creditAuditParam.approveStatus;
      if (approveStatus === 'A') {
        this.$refs['formCreditApply'].validate(async valid => {
          if (valid) {
            this.saveCreditApproveInfo();
          }
        });
      } else if (approveStatus === 'R') {
        this.$refs['formCreditApply'].validateField('creditAuditParam.rejectCause', (a) => {
          if (a) {
            this.$Notice.error({
              title: '错误信息',
              desc: '请选择拒绝理由'
            });
          } else {
            this.$refs['formCreditApply'].validateField('creditAuditParam.opinion', (a) => {
              if (!a) {
                this.saveCreditApproveInfo();
              } else {
                this.$Notice.error({
                  title: '错误信息',
                  desc: '请输入意见信息'
                });
              }
            });
          }
        });
      } else {
        this.$refs['formCreditApply'].validateField('creditAuditParam.opinion', (a) => {
          if (!a) {
            this.saveCreditApproveInfo();
          } else {
            this.$Notice.error({
              title: '错误信息',
              desc: '请输入意见信息'
            });
          }
        });
      }
    }
  }
};
