export default {
  methods: {
    selectCensusDistance(distance) {
      this.$data.formMaintain.bizProvinceCode = distance.provinceCode;
      this.$data.formMaintain.bizProvinceName = distance.provinceName;
      this.$data.formMaintain.bizCityCode = distance.districtCode;
      this.$data.formMaintain.bizCityName = distance.districtName;
      this.$data.formMaintain.bizDistrictCode = distance.cityCode;
      this.$data.formMaintain.bizDistrictName = distance.cityName;
    }
  }
};
