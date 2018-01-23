export default {
  methods: {
    // 选择权利人
    selectObligeeRow(row, index) {
      // console.log(row);
      this.$data.formCar.carOwnerName = row.name;
      this.$data.formCar.carOwnerNo = row.memberNo;
      this.$data.showSelectObligee = false;
    },
    selectCompanyOwnerRow(row, index) {
      this.$data.formCar.carOwnerName = row.corpName;
      this.$data.formCar.carOwnerNo = row.corpNo;
      this.$data.showSelectCompanyOwner = false;
    },
    // 选择担保人
    selectGuaRow(row, index) {
      // console.log(row);
      this.$data.formAssure.guaPersonCertNo = row.certNo;
      this.$data.formAssure.guaPersonCertType = row.certType;
      this.$data.formAssure.guaPersonMobile = row.mobile;
      this.$data.formAssure.guaPersonNo = row.memberNo;
      this.$data.formAssure.guaPersonName = row.name;
      this.$data.showSelectGua = false;
    },
    selectCompanyGuaRow(row, index) {
      this.$data.formAssure.guaPersonCertNo = row.creditCode;
      this.$data.formAssure.guaPersonCertType = '3';
      this.$data.formAssure.guaPersonMobile = row.telephone;
      this.$data.formAssure.guaPersonNo = row.corpNo;
      this.$data.formAssure.guaPersonName = row.corpName;
      this.$data.showSelectCompanyGua = false;
    },
    /**
     * 选择公司客户
     * @param company
     */
    selectCompany(company) {
      // console.log(company);
      this.$data.formData.memberNo = company.corpNo;
      this.$data.formData.memberName = company.corpName;
      this.$data.formData.mobileNo = company.telephone;
      this.$data.formData.certType = '';
      this.$data.formData.certNo = company.creditCode;
      this.$data.formData.custManagerNo = company.custMgrNo;
      this.$data.formData.custManagerName = company.custMgrName;
      this.$data.formData.deptNo = company.bizDepartmentCode;
      this.$data.formData.deptName = company.bizDepartmentName;
      this.$data.formData.deptCooperationStartDate = company.joinStartDate;
    },
    /**
     * 选择个人客户
     * @param CertData
     */
    getMember(CertData) {
      this.$data.member = CertData;
      if (CertData.mbMemberDTO) {
        this.$data.memberNo = CertData.mbMemberDTO.memberNo;
        this.$data.formData.memberNo = CertData.mbMemberDTO['memberNo'];
        this.$data.formData.memberName = CertData.mbMemberDTO.name;
        this.$data.formData.mobileNo = CertData.mobile;
        this.$data.formData.certType = CertData.mbMemberDTO.certType;
        this.$data.formData.certNo = CertData.mbMemberDTO.certNo;
        this.$data.formData.custManagerNo = CertData.mbMemberDTO.custMgrNo;
        this.$data.formData.custManagerName = CertData.mbMemberDTO.custMgrName;
        this.$data.formData.deptNo = CertData.mbMemberDTO.bizDepartmentCode;
        this.$data.formData.deptName = CertData.mbMemberDTO.bizDepartmentName;
        this.$data.formData.deptCooperationStartDate = CertData.mbMemberDTO.joinStartDate;
      }
    },
    // 选择产品
    async selectProduct(row, index) {
      this.$data.formData.productNo = row.productNo;
      this.$data.formData.productName = row.productName;
      this.$data.formData.productType = row.productType;
      this.$data.showSelectProduct = false;
      let resp = await this.$http.get('/pms/product/loanDocList', {
        productNo: row.productNo,
        custType: this.customerType
      });
      if (resp.success) {
        // 筛选出当前产品选中的配置
        let resultDocList = resp.body.filter(item => {
          return item.isSelectd;
        });
        this.$data.loanData = resultDocList.map(item => {
          return {
            loanDocCode: item.loanDocCode,
            loanDocName: item.loanDocName,
            status: '',
            docDetailAttachList: []
          };
        });
      }
    },
    /**
     * 选择渠道商
     * @param row
     * @param index
     */
    selectDistributor(row, index) {
      this.$data.formData.merchantNo = row.corpNo;
      this.$data.formData.merchantAbbr = row.corpName;
      this.$data.showSelectDistributor = false;
    },
    // 验证表单信息并向外抛出数据
    verification() {
      let formName = 'formData';
      let resReturn = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            (typeof this.$data.member.mbMemberDTO === 'undefined' || this.$data.member.mbMemberDTO.memberNo === '') &&
            (typeof this.$data.formData.memberNo === 'undefined' || this.$data.formData.memberNo === '')
          ) {
            this.$Message.error('请先选择一个客户', 2);
            return;
          }
          this.$data.formData.custType = this.customerType;
          this.$data.personalBasicInfo = $.extend(
            this.$data.member,
            { loanVO: this.$data.formData },
            { 'loanCarVOS': this.$data.carData },
            { 'loanGuaranteeVOS': this.$data.assureData },
            { 'loanDocDetailVOS': this.$data.loanData }
          );
          this.$emit('personalData', this.$data.personalBasicInfo);
          resReturn = true;
        } else {
          resReturn = false;
        }
      });
      return resReturn;
    },
    /**
     * 表单验证
     */
    validate() {
      let _valid = false;
      if (this.$data.formData.result !== 'A') {
        _valid = true;
      } else {
        this.$refs['formData'].validate((valid) => {
          if (!valid) {
            this.$Notice.error({
              title: '错误提示', desc: '请先完善申请信息'
            });
          }
          _valid = valid;
        });
      }
      return _valid;
    },
    /**
     * 获取申请数据
     * @returns {void|*|Function}
     */
    getApplyData() {
      return $.extend(
        this.$data.member,
        { loanVO: this.$data.formData },
        { 'loanCarVOS': this.$data.carData },
        { 'loanGuaranteeVOS': this.$data.assureData },
        { 'loanDocDetailVOS': this.$data.loanData }
      );
    },
    async initPage() {
      await bsWait(800);
      if (this.applyBasicInfo) {
        this.$data.formData = $.extend({}, this.applyBasicInfo);
        this.$data.memberNo = this.applyBasicInfo.memberNo;
        // this.$data.corpNo = this.applyBasicInfo.corpNo;
        this.$data.initApplyInfoLoading = true;
        let getLoanCarListResp = this.$http.post('/biz/listLoanCarByLoanNo', {
          loanNo: this.applyBasicInfo.loanNo
        });
        let getGuaListResp = this.$http.post('/biz/listGuaranteeByLoanNo', {
          loanNo: this.applyBasicInfo.loanNo
        });
        let getLoanDocListResp = this.$http.post('/biz/listDocDetailByLoanNo', {
          loanNo: this.applyBasicInfo.loanNo,
          custType: this.applyBasicInfo.custType
        });
        this.$data.initApplyInfoLoading = false;
        let carResp = await getLoanCarListResp;
        let guaResp = await getGuaListResp;
        let loanDocResp = await getLoanDocListResp;
        if (carResp.success) {
          this.$data.carData = carResp.body.resultList || [];
        }
        if (guaResp.success) {
          this.$data.assureData = guaResp.body.resultList || [];
        }
        if (loanDocResp.success) {
          this.$data.loanData = loanDocResp.body.resultList || [];
        }
      }
    }
  }
};
