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
          await bsWait(500);
          // 如果是个人客户，获取人行征信报告
          if (resp.body.custType === '1') {
            this.getCreditReportUrl();
          }
        }
      }
    },
    /**
     * 获取人行征信报告的url
     * @returns {Promise<void>}
     */
    async getCreditReportUrl() {
      let loanNo = this.$route.query.id;
      if (loanNo) {
        let resp = await this.$http.post('/biz/getCreditReportURL', {
          loanNo
        });
        if (resp.success) {
          this.$data.showCreditCheckbox = true;
          this.$data.creditReportURL = resp.body.creditFinalURL;
        } else {
          this.$data.showCreditCheckbox = false;
          this.$data.isCreditEerror = true; // 显示 “暂无征信查询结果” 的提示语
        }
      }
    },
    /**
     * 提交审批
    */
    async submitLoanApprove() {
      let submitUrl = '';
      let loanNode = this.$route.query.status;
      // 根据状态设置提交的url
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
      // alert(vmApplyInfo.validate());
      if (vmApplyInfo.validate()) {
        applyData = vmApplyInfo.getApplyData();
        let approveInfoValid = true;
        approveData = vmApproveInfo.getApproveData();
        // 只有审批通过才需要执行审批信息的表单验证
        if (approveData.loanApproveDTO.result === 'A' && !this.applyInfoReadonly) {
          approveInfoValid = vmApproveInfo.validate();
        }
        if (approveInfoValid) {
          // approveData = vmApproveInfo.getApproveData();
          this.$data.submitApproveLoading = true;
          const loading = this.$Message.loading({
            content: '正在提交审批...',
            duration: 0
          });
          let submitData = {};
          if (loanNode === '3') {
            if (this.$data.showCreditCheckbox && !this.$data.isHasCheckCreditReport) {
              this.$data.tabIndex = 2;
              $('html, body')[0].scrollTop = 0; // 滚动条滚动到顶部
              this.$Message.error({
                content: '请确认已查看征信报告！',
                duration: 2
              });
              this.$data.submitApproveLoading = false;
              loading();
              return;
            }
            submitData = $.extend({ opeType: '2', hasCheckCreditReport: '1' }, applyData, approveData);
          } else {
            submitData = {
              loanNo: applyData.loanVO.loanNo,
              loanApproveDTO: approveData.loanApproveDTO
            };
          }
          // console.log(submitData.loanApproveDTO.result);
          // 点击提价时给用户一个确认交互
          if (submitData.loanApproveDTO.result === '' || submitData.loanApproveDTO.opinion === '') {
            this.$Message.error({
              content: '请完善审核意见信息！',
              duration: 2
            });
            this.$data.tabIndex = 1;
            this.$data.submitApproveLoading = false;
            loading();
            $('html, body')[0].scrollTop = $('body')[0].clientHeight; // 滚动条滚动到底部
            return;
          } else if (
            submitData.loanApproveDTO.result === 'R' &&
            (!submitData.loanApproveDTO.rejectCause || submitData.loanApproveDTO.rejectCause === '')
          ) {
            this.$Message.error({
              content: '请选择拒绝原因！',
              duration: 2
            });
            this.$data.tabIndex = 1;
            $('html, body')[0].scrollTop = $('body')[0].clientHeight; // 滚动条滚动到底部
            this.$data.submitApproveLoading = false;
            loading();
            return;
          }
          await this.$AuditPrompt.auditPromptFun(submitData.loanApproveDTO.result, async () => {
            let resp = await this.$http.post(submitUrl, submitData);
            if (resp.success && resp.reMsg !== '失败') {
              this.$Message.success('审批成功');
              this.$router.push({
                name: 'loanBusinessList'
              });
            }
          });
          this.$data.submitApproveLoading = false;
          loading();
        }
      }
    }
  }
};
