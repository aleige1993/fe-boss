export default {
  methods: {
    uploadFaceSuccess(res, file, fileList) {
      this.$data.formData.mbMemberDTO.certFrontUrl = res.body.url;
    },
    uploadBackSuccess(res) {
      // aa
      this.$data.formData.mbMemberDTO.certBackUrl = res.body.url;
    },
    uploadHandSuccess(res) {
      // aa
      this.$data.formData.mbMemberDTO.certHandUrl = res.body.url;
    },
    uploadError(err, file, fileList) {
      this.$Notice.error({
        title: '错误提示', desc: err
      });
    },
    checkoutCertNo() {
      let certNo = this.formData.mbMemberDTO.certNo;
      alert(certNo);
    },
    selectCompany(row, index) {
      alert(index);
    },
    certValidDateChange(val) {
      this.$data.formData.mbMemberDTO.certValidDate = val;
    },
    // 户籍地址联动
    selectCensusDistance(distance) {
      this.$data.formData.mbMemberDTO.censusProvinceCode = distance.provinceCode;
      this.$data.formData.mbMemberDTO.censusProvinceName = distance.provinceName;
      this.$data.formData.mbMemberDTO.censusDistrictCode = distance.districtCode;
      this.$data.formData.mbMemberDTO.censusDistrictName = distance.districtName;
      this.$data.formData.mbMemberDTO.censusCityCode = distance.cityCode;
      this.$data.formData.mbMemberDTO.censusCityName = distance.cityName;
    },
    // 居住地址联动
    selectNowDistance(distance) {
      this.$data.formData.mbMemberDTO.nowProvinceName = distance.provinceCode;
      this.$data.formData.mbMemberDTO.nowProvinceName = distance.provinceName;
      this.$data.formData.mbMemberDTO.nowDistrictCode = distance.districtCode;
      this.$data.formData.mbMemberDTO.nowDistrictName = distance.districtName;
      this.$data.formData.mbMemberDTO.nowCityCode = distance.cityCode;
      this.$data.formData.mbMemberDTO.nowCityName = distance.cityName;
    },
    // 公司地址联动
    selectCompanyDistance(distance) {
      this.$data.formData.mbMemberWorkDTO.provinceCode = distance.provinceCode;
      this.$data.formData.mbMemberWorkDTO.provinceName = distance.provinceName;
      this.$data.formData.mbMemberWorkDTO.districtCode = distance.districtCode;
      this.$data.formData.mbMemberWorkDTO.districtName = distance.districtName;
      this.$data.formData.mbMemberWorkDTO.cityCode = distance.cityCode;
      this.$data.formData.mbMemberWorkDTO.cityName = distance.cityName;
    },
    // 保存信息
    async saveBasicCustomerInfo(data) {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/member/save', data);
      this.$data.initFormLoading = false;
      if (resp.reCode === '0000') {
        this.$Message.success('基础信息保存成功');
        this.$emit('on-submit-success', resp.body);
      }
    },
    // 保存草稿
    saveBasicInfo() {
      let _data = this.$data.formData;
      _data.mbMemberDTO.status = '3';
      this.saveBasicCustomerInfo(_data);
    },
    // 提交
    submitBasicInfo() {
      this.$data.formData.mbMemberDTO.status = '';
      let _data = this.$data.formData;
      _data.mbMemberDTO.status = '1';
      this.$refs['formAddCustomer'].validate((valid) => {
        if (valid) {
          this.saveBasicCustomerInfo(_data);
        } else {
          this.$Notice.error({
            title: '错误提示', desc: '请先完善基本信息再提交!'
          });
        }
      });
    }
  }
};
