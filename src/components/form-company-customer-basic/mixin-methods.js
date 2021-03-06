export default {
  methods: {
    async getDepList() {
      let resp = await this.$http.post('/common/dept/tree', {});
      if (resp.success) {
        this.$data.depData = resp.body.children;
      }
    },
    /**
     * 验证统一社会信用代码是否已经存在
     */
    verifyCreditCode() {
      if (this.$data.checkoutCertNoTimer) {
        this.$data.checkoutCertNoTimer = null;
      }
      this.$data.checkoutCertNoTimer = setTimeout(async() => {
        let resp = await this.$http.post('/corp/isRepeatCreditCode', { creditCode: this.$data.formData.baseDTO.creditCode });
        if (resp.success) {
          if (resp.body) {
            Alertify.alert('您输入的社会信用代码已经存在，请换一个再试');
          }
        }
      }, 500);
    },
    // 选择注册地址
    selectRegDistance(distance) {
      this.$data.formData.baseDTO.regProvinceCode = distance.provinceCode;
      this.$data.formData.baseDTO.regProvinceName = distance.provinceName;
      this.$data.formData.baseDTO.regCityCode = distance.cityCode;
      this.$data.formData.baseDTO.regCityName = distance.cityName;
      this.$data.formData.baseDTO.regDistrictCode = distance.districtCode;
      this.$data.formData.baseDTO.regDistrictName = distance.districtName;
    },
    // 选择营业地址
    selectBizDistance(distance) {
      this.$data.formData.baseDTO.bizProvinceCode = distance.provinceCode;
      this.$data.formData.baseDTO.bizProvinceName = distance.provinceName;
      this.$data.formData.baseDTO.bizCityCode = distance.cityCode;
      this.$data.formData.baseDTO.bizCityName = distance.cityName;
      this.$data.formData.baseDTO.bizDistrictCode = distance.districtCode;
      this.$data.formData.baseDTO.bizDistrictName = distance.districtName;
    },
    // 选择业务拓展部门
    selectDep(id, row, data) {
      this.$data.formData.baseDTO.bizDepartmentCode = data.id;
      this.$data.formData.baseDTO.bizDepartmentName = data.text;
      this.$data.selectDepartmentModal = false;
    },
    // 选择客户经理
    selectEmployer(row, index) {
      this.$data.formData.baseDTO.custMgrNo = row.userCode;
      this.$data.formData.baseDTO.custMgrName = row.userName;
      this.$data.showSelectEmployer = false;
    },
    // 选择法人代表
    selectRulerRow(row, index) {
      // console.log(row);
      this.$data.formData.baseDTO.legalPersonNo = row.memberNo;
      this.$data.formData.baseDTO.legalPerson = row.name;
      this.$data.formData.baseDTO.legalPersonSex = row.sex;
      this.$data.formData.baseDTO.legalPersonMobile = row.mobile;
      this.$data.formData.baseDTO.legalPersonCerttype = row.certType;
      this.$data.formData.baseDTO.legalPersonCertno = row.certNo;
      this.$data.selectRulerModal = false;
    },
    // 上传附件
    openAddAttachModal() {
      this.$data.addAttachModal = true;
      this.$data.attachFormData = {
        attachName: '',
        attachUrl: ''
      };
    },
    uploadAttachLoading() {
      this.$data.isUploadAttachLoading = true;
    },
    uploadAttachSuccess(res) {
      this.$data.isUploadAttachLoading = false;
      this.$data.attachFormData.attachUrl = res.body.url;
      this.$data.attachFormData.fileName = res.body.fileName;
    },
    submitAttach() {
      this.$refs['formCompanyCustomerAttach'].validate(valid => {
        if (valid) {
          this.$data.formData.attachDTOs.push(this.$data.attachFormData);
          this.$data.addAttachModal = false;
        }
      });
    },
    // 初始化页面
    async initFormData(corpNo) {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/corp/getCorpDetail', {
        corpNo
      });
      this.$data.initFormLoading = false;
      this.$data.loadingAttachFile = true;
      let resp2 = await this.$http.post('/corp/listCorpAttach', {
        corpNo,
        currentPage: 1,
        pageSize: 9999
      });
      this.$data.loadingAttachFile = false;
      if (resp.success) {
        this.$data.formData.baseDTO = resp.body.baseDTO;
        await bsWait(500);
        this.$emit('on-submit-success', {
          corpNo: resp.body.baseDTO.corpNo,
          corpName: resp.body.baseDTO.corpName
        });
      }
      if (resp2.success) {
        this.$data.formData.attachDTOs = resp2.body.resultList;
      }
    },
    // 保存草稿 status 1激活  2冻结  3草稿
    async postCompanyBasic() {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/corp/saveCorp', this.$data.formData);
      this.$data.initFormLoading = false;
      if (resp.success) {
        this.$Message.success('保存基础信息成功');
        this.$data.formData.baseDTO.corpNo = resp.body.corpNo;
        this.$emit('on-submit-success', resp.body);
      }
    },
    saveCompanyCustomerBasic() {
      this.$data.formData.baseDTO.status = '3';
      this.postCompanyBasic();
    },
    // 提交
    submitCompanyCustomerBasic() {
      this.$refs['formCompanyCustomerBasicInfo'].validate((valid) => {
        if (valid) {
          this.$data.formData.baseDTO.status = '1';
          this.postCompanyBasic();
        }
      });
    }
  }
};
