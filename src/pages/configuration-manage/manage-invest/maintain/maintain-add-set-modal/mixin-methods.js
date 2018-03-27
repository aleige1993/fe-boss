export default {
  methods: {
    selectCensusDistance(distance) {
      this.$data.formMaintain.bizProvinceCode = distance.provinceCode;
      this.$data.formMaintain.bizProvinceName = distance.provinceName;
      this.$data.formMaintain.bizDistrictCode = distance.districtCode;
      this.$data.formMaintain.bizDistrictName = distance.districtName;
      this.$data.formMaintain.bizCityCode = distance.cityCode;
      this.$data.formMaintain.bizCityName = distance.cityName;
    }
  }
};
