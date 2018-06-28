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
          if (resp.body.custType === '1' && this.taskNode !== '0' && this.taskNode !== '1') {
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
        this.$data.creditReportURLLoading = true;
        let resp = await this.$http.post('/biz/getCreditReportURL', {
          loanNo
        });
        this.$data.creditReportURLLoading = false;
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
    * 提交数据到后端
    */
    async submitApproveData(submitUrl, submitData) {
      this.$data.submitApproveLoading = true;
      let resp = await this.$http.post(submitUrl, submitData);
      this.$data.submitApproveLoading = false;
      if (resp.success && resp.reMsg !== '失败') {
        this.$Message.success(submitData.opeType === '1' ? '保存成功' : '审批成功');
        if (submitData.opeType !== '1') {
          this.$router.push({
            name: 'loanBusinessList'
          });
        }
      }
    },
    /**
     * 提交审批 -- 保存草稿
    */
    saveLoanApproveCraft() {
      // TODO
      Alertify.confirm('确定要保存当前数据吗？', ok => {
        let vmApplyInfo = this.$refs['applyInfo'];
        let applyData = vmApplyInfo.getApplyData();
        let vmApproveInfo = this.$refs['approveInfo'];
        let approveData = vmApproveInfo.getApproveData();
        let submitData = $.extend({ opeType: '1' }, applyData, approveData);
        this.submitApproveData('/biz/saveLoanApprove', submitData);
      });
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
          let submitData = {};
          if (loanNode === '3') {
            if (approveData.loanApproveDTO.result === 'A' && this.$data.showCreditCheckbox && !this.$data.isHasCheckCreditReport) {
              this.$data.tabIndex = 'tabCreditInfo';
              $('html, body')[0].scrollTop = 0; // 滚动条滚动到顶部
              this.$Message.error({
                content: '请确认已查看征信报告！',
                duration: 2
              });
              return;
            }
            submitData = $.extend({ opeType: '2', hasCheckCreditReport: '1' }, applyData, approveData);
          } else {
            submitData = {
              loanNo: applyData.loanVO.loanNo,
              approveLimitAmt: approveData.loanApproveCreditDTO.approveLimitAmt, // 审批额度
              loanRealRate: approveData.loanApproveCreditDTO.loanRealRate, // 颂车定收利率
              loanApproveDTO: approveData.loanApproveDTO
            };
          }
          // 点击提价时给用户一个确认交互
          if (submitData.loanApproveDTO.result === '' || submitData.loanApproveDTO.opinion === '') {
            this.$Message.error({
              content: '请完善审核意见！',
              duration: 2
            });
            this.$data.tabIndex = 'tabApproveInfo';
            $('html, body')[0].scrollTop = $('body')[0].clientHeight; // 滚动条滚动到底部
            return;
          } else if (submitData.loanApproveDTO.result === 'R' && (!submitData.loanApproveDTO.rejectCause || submitData.loanApproveDTO.rejectCause === '')) {
            this.$Message.error({
              content: '请选择拒绝原因！',
              duration: 2
            });
            this.$data.tabIndex = 'tabApproveInfo';
            $('html, body')[0].scrollTop = $('body')[0].clientHeight; // 滚动条滚动到底部
            return;
          }
          Alertify.confirm('确定要提交审批吗？', ok => {
            if (ok) {
              this.submitApproveData(submitUrl, submitData);
            }
          });
        } else {
          this.$Message.error('请先完善审批信息');
          this.$data.tabIndex = 'tabApproveInfo';
          setTimeout(() => {
            $('html, body')[0].scrollTop = $('#busApproveInfo').offset().top + 130;
          }, 200);
        }
      }
    }
  }
};
