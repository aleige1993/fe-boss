<template>
  <span  class="select-show-input">
    <i-select :placeholder="currProvince" :disabled="readonly"  :label-in-value="true" v-model="distanceData.provinceCode"  @on-change="provinceChange" style="width: 150px">
      <i-option v-for="item in provinceDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
    </i-select>
    <i-select :placeholder="currDistrict" :="readonly" :label-in-value="true" v-model="distanceData.districtCode" @on-change="districtChange" style="width: 150px">
      <i-option v-for="item in districtDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
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
      currDistrict: {
        default: '',
        required: false,
        type: String
      },
      readonly: {
        default: false,
        required: false,
        type: Boolean
      },
      filterCQ: {
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
          // 过滤重庆市郊县
          if (this.filterCQ && val.value === '500000') {
            this.$data.districtDropList = [
              {
                'regionCode': '500100',
                'regionName': '重庆城区'
              }
            ];
          } else {
            this.$data.districtDropList = resp.body;
          }
        }
        this.$emit('on-change', { ...this.$data.distanceData });
      },
      async districtChange(val) {
        this.$data.distanceData.districtName = val.label;
        this.$emit('on-change', { ...this.$data.distanceData });
      },
      async initData() {
        // alert(1);
        if (this.currProvinceCode !== '') {
          let resp = await this.getAddressDropList(this.currProvinceCode);
          if (resp.success) {
            this.$data.districtDropList = resp.body;
          }
          // this.$data.distanceData = Object.assign(this.$data.distanceData, { provinceCode: this.currProvinceCode });
        }
        if (this.currDistrictCode !== '') {
        }
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
