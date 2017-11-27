export default {
  methods: {
    provinceChange(val) {
      this.$data.formMaintain.provinceName = val.label;
      let resp = this.getAddressDropList(val.value);
      this.$data.cityArray = resp.body;
    },
    async cityChange(val) {
      this.$data.formMaintain.cityName = val.label;
      let resp = await this.getAddressDropList(val.value);
      this.$data.areaArray = resp.body;
    },
    areaChange(val) {
      this.$data.formMaintain.areaName = val.label;
    }
  }
};
