export default {
  methods: {
    selectCensusDistance(distance) {
      this.$data.formMaintain.censusProvinceCode = distance.provinceCode;
      this.$data.formMaintain.censusProvinceName = distance.provinceName;
      this.$data.formMaintain.censusDistrictCode = distance.districtCode;
      this.$data.formMaintain.censusDistrictName = distance.districtName;
      this.$data.formMaintain.censusCityCode = distance.cityCode;
      this.$data.formMaintain.censusCityName = distance.cityName;
    }
  }
};
