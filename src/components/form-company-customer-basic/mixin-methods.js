export default {
  methods: {
    async getDepList() {
      let resp = await this.$http.post('/common/dept/tree', {});
      if (resp.success) {
        this.$data.depData = resp.body.children;
      }
    },
    // 选择注册地址
    selectRegDistance(distance) {
      this.$data.formData.baseDTO.regProvinceCode = distance.provinceCode;
      this.$data.formData.baseDTO.regProvinceName = distance.provinceName;
      this.$data.formData.baseDTO.regDistrictCode = distance.districtCode;
      this.$data.formData.baseDTO.regDistrictName = distance.districtName;
      this.$data.formData.baseDTO.regCityCode = distance.cityCode;
      this.$data.formData.baseDTO.regCityName = distance.cityName;
    },
    // 选择营业地址
    selectBizDistance(distance) {
      this.$data.formData.baseDTO.regProvinceCode = distance.provinceCode;
      this.$data.formData.baseDTO.regProvinceName = distance.provinceName;
      this.$data.formData.baseDTO.regDistrictCode = distance.districtCode;
      this.$data.formData.baseDTO.regDistrictName = distance.districtName;
      this.$data.formData.baseDTO.regCityCode = distance.cityCode;
      this.$data.formData.baseDTO.regCityName = distance.cityName;
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
      this.$data.formData.baseDTO.legalPerson = row.name;
      this.$data.formData.baseDTO.legalPersonSex = row.sex;
      this.$data.formData.baseDTO.legalPersonMobile = row.mobile;
      this.$data.formData.baseDTO.legalPersonCerttype = row.certType;
      this.$data.formData.baseDTO.legalPersonCertno = row.certNo;
      this.$data.selectRulerModal = false;
    },
    // 上传附件
    uploadAttachSuccess(res) {
      this.$data.attachFormData.url = res.body.url;
    },
    // 保存草稿 status 1激活  2冻结  3草稿
    saveCompanyCustomerBasic() {
      this.$data.formData.baseDTO.status = '3';
    },
    // 提交
    submitCompanyCustomerBasic() {
      this.$refs['formCompanyCustomerBasicInfo'].validate(async (valid) => {
        if (valid) {
          this.$data.formData.baseDTO.status = '1';
          this.$data.initFormLoading = true;
          let resp = await this.$http.post('/corp/saveCorp', this.$data.formData);
          this.$data.initFormLoading = false;
          if (resp.success) {
            this.$Message.success('保存基础信息成功');
            this.$emit('on-submit-success', resp.body);
          }
        }
      });
    }
  }
};
