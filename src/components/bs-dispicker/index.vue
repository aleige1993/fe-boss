<template>
  <span  class="select-show-input">
    <i-select :placeholder="currProvince" :disabled="readonly"  :label-in-value="true" v-model="distanceData.provinceCode"  @on-change="provinceChange" style="width: 150px">
      <i-option value="-1" style="height: 26px; color: #bbbec4">请选择</i-option>
      <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <i-select :placeholder="currCity" :disabled="readonly || distanceData.provinceCode === ''" :label-in-value="true" v-model="distanceData.cityCode" @on-change="cityChange" style="width: 150px">
      <i-option value="-1" style="height: 26px; color: #bbbec4">请选择</i-option>
      <i-option v-for="item in cityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <i-select :placeholder="currDistrict" :disabled="readonly || distanceData.cityCode === ''" :label-in-value="true" v-model="distanceData.districtCode" @on-change="districtChange" style="width: 150px">
      <i-option value="-1" style="height: 26px; color: #bbbec4">请选择</i-option>
      <i-option v-for="item in districtDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <!--<p>{{distanceData}}</p>-->
  </span>
</template>
<script>
  export default {
    name: 'bsDispicker',
    data() {
      return {
        provinceDropList: [],
        cityDropList: [],
        districtDropList: [],
        distanceData: {
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          districtCode: '',
          districtName: ''
        }
      };
    },
    props: {
      currProvince: {
        default: '',
        required: false,
        type: String
      },
      currCity: {
        default: '',
        required: false,
        type: String
      },
      currDistrict: {
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
    watch: {
      'distanceData.provinceCode'() {
        if (this.$data.distanceData.provinceCode === '-1') {
          this.initProvince();
          this.initCity();
          this.initDistrict();
        }
      },
      'distanceData.cityCode'() {
        if (this.$data.distanceData.cityCode === '-1') {
          this.initCity();
          this.initDistrict();
        }
      },
      'distanceData.districtCode'() {
        if (this.$data.distanceData.districtCode === '-1') {
          this.initDistrict();
        }
      }
    },
    methods: {
      initProvince() {
        this.$data.distanceData.provinceCode = '';
        this.$data.distanceData.provinceName = '';
      },
      initCity() {
        this.$data.distanceData.cityCode = '';
        this.$data.distanceData.cityName = '';
      },
      initDistrict() {
        this.$data.distanceData.districtCode = '';
        this.$data.distanceData.districtName = '';
      },
      // 获取地址下拉联动
      getAddressDropList(code = '') {
        let data = {
          regionCode: code
        };
        return this.$http.post('/common/region/list', data, false);
      },
      async provinceChange(val) {
        this.$data.distanceData.provinceCode = val.value;
        this.$data.distanceData.provinceName = val.label;
        let resp = await this.getAddressDropList(val.value);
        if (resp.success) {
          this.$data.cityDropList = resp.body;
          this.initCity();
          this.initDistrict();
        }
        this.$emit('on-change', { ...this.$data.distanceData });
      },
      async cityChange(val) {
        this.$data.distanceData.cityName = val.label;
        if (val.value === '') {
          return false;
        }
        let resp = await this.getAddressDropList(val.value);
        if (resp.success) {
          this.$data.districtDropList = resp.body;
        }
        this.$emit('on-change', Object.assign({}, this.$data.distanceData));
      },
      districtChange(val) {
        this.$data.distanceData.districtName = val.label;
        this.$emit('on-change', { ...this.$data.distanceData });
      }
    },
    async mounted() {
      let resp = await this.getAddressDropList();
      if (resp.success) {
        this.$data.provinceDropList = resp.body;
      }
    }
  };
</script>
<style  lang="scss" scoped>
</style>
