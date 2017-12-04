<template>
  <span>
    <i-select :placeholder="currProvince" :disabled="readonly"  :label-in-value="true" v-model="distanceData.provinceCode"  @on-change="provinceChange" style="width: 150px">
      <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <i-select :placeholder="currDistrict" :="readonly" :label-in-value="true" v-model="distanceData.districtCode" @on-change="districtChange" style="width: 150px">
      <i-option v-for="item in districtDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <i-select :placeholder="currCity" :disabled="readonly" :label-in-value="true" @on-change="cityChange" v-model="distanceData.cityCode" style="width: 150px">
      <i-option v-for="item in cityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
  </span>
</template>
<script>
  export default {
    name: 'bsDispicker',
    data() {
      return {
        provinceDropList: [],
        districtDropList: [],
        cityDropList: [],
        distanceData: {
          provinceCode: '',
          provinceName: '',
          districtCode: '',
          districtName: '',
          cityCode: '',
          cityName: ''
        }
      };
    },
    props: {
      currProvince: {
        default: '',
        required: false,
        type: String
      },
      currDistrict: {
        default: '',
        required: false,
        type: String
      },
      currCity: {
        default: '',
        required: false,
        type: String
      },
      readonly: {
        default: false,
        required: false,
        type: Boolean
      }
    },
    methods: {
      // 获取地址下拉联动
      getAddressDropList(code = '') {
        let data = {
          regionCode: code
        };
        return this.$http.post('/common/region/list', data, false);
      },
      async provinceChange(val) {
        this.$data.distanceData.provinceName = val.label;
        let resp = await this.getAddressDropList(val.value);
        if (resp.success) {
          this.$data.districtDropList = resp.body;
        }
        this.$emit('on-change', { ...this.$data.distanceData });
      },
      async districtChange(val) {
        this.$data.distanceData.districtName = val.label;
        let resp = await this.getAddressDropList(val.value);
        if (resp.success) {
          this.$data.cityDropList = resp.body;
        }
        this.$emit('on-change', Object.assign({}, this.$data.distanceData));
      },
      cityChange(val) {
        this.$data.distanceData.cityName = val.label;
        this.$emit('on-change', { ...this.$data.distanceData });
      },
      async initData() {
        // alert(1);
        if (this.currProvinceCode !== '') {
          let resp = await this.getAddressDropList(this.currProvinceCode);
          if (resp.success) {
            this.$data.districtDropList = resp.body;
          }
          this.$data.distanceData = Object.assign(this.$data.distanceData, { provinceCode: this.currProvinceCode });
        }
        if (this.currDistrictCode !== '') {
          let resp = await this.getAddressDropList(this.currDistrictCode);
          if (resp.success) {
            this.$data.cityDropList = resp.body;
          }
          this.$data.distanceData = Object.assign(this.$data.distanceData, { districtCode: this.currDistrictCode });
        }
        if (this.currCityCode !== '') {
          this.$data.distanceData = Object.assign(this.$data.distanceData, { cityCode: this.currCityCode });
        }
      }
    },
    async mounted() {
      let resp = await this.getAddressDropList();
      if (resp.success) {
        this.$data.provinceDropList = resp.body;
      }
      // await bsWait(2000);
      // this.initData();
    }
  };
</script>
<style>

</style>
