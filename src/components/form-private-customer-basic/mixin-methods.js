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
        desc: err
      });
    },
    selectCompany(row, index) {
      alert(index);
    },
    certValidDateChange(val) {
      this.$data.formData.mbMemberDTO.certValidDate = val;
    },
    // 户籍地址联动
    getAddressDropList(code = '') {
      let data = {
        regionCode: code
      };
      return this.$http.post('/common/region/list', data, false);
    },
    async censusProvinceChange(val) {
      this.$data.formData.mbMemberDTO.censusProvinceName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.censusDistrictDropList = resp.body;
    },
    async censusDistrictChange(val) {
      this.$data.formData.mbMemberDTO.censusDistrictName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.censusCityDropList = resp.body;
    },
    censusCityChange(val) {
      this.$data.formData.mbMemberDTO.censusCityName = val.label;
    },
    // 居住地址联动
    async nowProvinceChange(val) {
      this.$data.formData.mbMemberDTO.nowProvinceName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.nowDistrictDropList = resp.body;
    },
    async nowDistrictChange(val) {
      this.$data.formData.mbMemberDTO.nowDistrictName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.nowCityDropList = resp.body;
    },
    nowCityChange(val) {
      this.$data.formData.mbMemberDTO.nowCityName = val.label;
    },
    // 公司地址联动
    async companyProvinceChange(val) {
      this.$data.formData.mbMemberWorkDTO.provinceName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.companyDistictDropList = resp.body;
    },
    async companyDistrictChange(val) {
      this.$data.formData.mbMemberWorkDTO.districtName = val.label;
      let resp = await this.getAddressDropList(val);
      this.$data.companyCityDropList = resp.body;
    },
    companyCityChange(val) {
      this.$data.formData.mbMemberWorkDTO.cityName = val.label;
    },
    // 保存信息
    async saveBasicCustomerInfo(data) {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/member/save', data);
      this.$data.initFormLoading = false;
      if (resp.reCode === '0000') {
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
            desc: '清完善银行信息!'
          });
        }
      });
    }
  }
};
