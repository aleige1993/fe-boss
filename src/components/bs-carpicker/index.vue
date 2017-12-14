<template>
  <span>
    <i-select filterable :placeholder="currBrand" :disabled="readonly"  :label-in-value="true" v-model="carData.brandCode"  @on-change="brandChange" style="width: 150px">
      <i-option-group v-for="item in brandDropList" :label="item.groupName">
        <i-option v-for="brand in item.groupList"  :value="brand.id" :key="brand.id">{{brand.brandName}}</i-option>
      </i-option-group>
    </i-select>
    <i-select filterable :placeholder="currSeries" :disabled="readonly" :label-in-value="true" v-model="carData.seriesCode" @on-change="seriesChange" style="width: 150px">
      <i-option-group v-for="item in seriesDropList" :label="item.groupName">
        <i-option v-for="s in item.groupList"  :value="s.id" :key="s.id">{{s.seriesName}}</i-option>
      </i-option-group>
    </i-select>
     <i-select filterable :placeholder="currModel" :disabled="readonly" :label-in-value="true" @on-change="modelChange" v-model="carData.modelCode" style="width: 180px">
      <i-option-group v-for="item in modelDropList" :label="item.groupName">
        <i-option v-for="m in item.groupList"  :value="m.id" :key="m.id">{{m.modelName}}</i-option>
      </i-option-group>
    </i-select>
  </span>
</template>
<script>
  export default {
    name: 'bsCarPicker',
    data() {
      return {
        brandDropList: [],
        seriesDropList: [],
        modelDropList: [],
        carData: {
          brandCode: '',
          brandName: '',
          seriesCode: '',
          seriesName: '',
          modelCode: '',
          modeName: ''
        }
      };
    },
    props: {
      currBrand: {
        default: '',
        required: false,
        type: String
      },
      currSeries: {
        default: '',
        required: false,
        type: String
      },
      currModel: {
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
      getBrandDropList(brandName = '') {
        let data = {
          brandName: brandName
        };
        return this.$http.post('/ces/getMasterBrand', data, false);
      },
      async brandChange(val) {
        this.$data.carData.brandName = val.label;
        let resp = await this.$http.post('/ces/getSeriesByBrand', {
          brandId: val.value,
          seriesName: ''
        });
        if (resp.success) {
          this.$data.seriesDropList = resp.body.list;
        }
        this.$emit('on-change', { ...this.$data.carData });
      },
      async seriesChange(val) {
        this.$data.carData.seriesName = val.label;
        let resp = await this.$http.post('/ces/getModelBySeries', {
          seriesId: val.value,
          modelName: ''
        });
        if (resp.success) {
          this.$data.modelDropList = resp.body.list;
        }
        this.$emit('on-change', Object.assign({}, this.$data.carData));
      },
      modelChange(val) {
        this.$data.carData.modelName = val.label;
        this.$emit('on-change', { ...this.$data.carData });
      }
    },
    async mounted() {
      let resp = await this.getBrandDropList();
      if (resp.success) {
        this.$data.brandDropList = resp.body.list;
      }
      // await bsWait(2000);
      // this.initData();
    }
  };
</script>
<style>

</style>
